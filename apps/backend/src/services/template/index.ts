import { FieldType, Prisma } from "@prisma/client"
import { ProjectTemplate } from "@namviek/core"
import { FieldService } from "../field"

export class TemplateService {
  fieldService: FieldService

  constructor() {
    this.fieldService = new FieldService()
  }

  async createFromTemplate(
    tx: Prisma.TransactionClient,
    template: ProjectTemplate,
    projectId: string,
    userId: string
  ) {
    try {
      // Step 1: Create all grid collections first and store their IDs
      const gridMap = new Map<string, string>()

      for (const collection of template.gridCollections) {
        console.log(`Creating grid collection: ${collection.title}`)
        const grid = await tx.gridCollection.create({
          data: {
            title: collection.title,
            projectId: projectId,
            createdAt: new Date(),
            createdBy: userId
          }
        })
        gridMap.set(collection.title, grid.id)
      }

      // Step 2: Create fields and store connector field IDs
      const fieldIdMap = new Map<string, [string, string]>()
      const connectorFieldMap = new Map<string, { displayedField: string, grid: string }>()

      for (const collection of template.gridCollections) {
        const collectionName = collection.title
        const gridId = gridMap.get(collection.title)!

        for (const field of collection.fields) {
          const fieldName = field.name
          const config = field.type !== FieldType.CONNECTOR ? (field.config || {}) : {}
          const newField = await tx.field.create({
            data: {
              name: field.name,
              type: field.type,
              config: {},
              width: field.width || 200,
              order: 0,
              gridCollectionId: gridId,
              hidden: false,
              data: config
            }
          })

          const key = `${collectionName}-${fieldName}`
          fieldIdMap.set(key, [newField.id, gridId])

          if (field.type === FieldType.CONNECTOR) {
            const connectorConfig = field.config || {}
            connectorFieldMap.set(key, {
              grid: connectorConfig.grid,
              displayedField: connectorConfig.displayedField
            })
          }
        }
      }

      // Step 3: Update connector fields with display field IDs

      const fieldUpdatePromise = []
      console.log('connectorFieldMap', connectorFieldMap)
      console.log('field map', fieldIdMap)
      for (const [key, value] of connectorFieldMap) {
        const keyName = [value.grid, value.displayedField].filter(Boolean).join('-')
        console.log('target field', key)
        console.log('map field:', keyName)

        if (!keyName) {
          console.log('Keyname not found', keyName)
          continue
        }

        const [displayedFieldId, connectorGridId] = fieldIdMap.get(keyName)
        const [fieldId] = fieldIdMap.get(key)

        if (!displayedFieldId || !connectorGridId) {
          console.log('Oppps, missing important infor:', key, keyName)
          continue
        }

        fieldUpdatePromise.push(await tx.field.update({
          where: {
            id: fieldId
          },
          data: {
            config: {
              targetGridCollectionId: connectorGridId,
              displayFieldId: displayedFieldId,
            }
          }
        }))
      }

      await Promise.all(fieldUpdatePromise)

      // Step 4: Insert sample data
      for (const collection of template.gridCollections) {
        if (!collection.sampleData) continue
        
        const gridId = gridMap.get(collection.title)!
        console.log(`Processing sample data for grid: ${collection.title}`)

        // Map sample data to field IDs using fieldIdMap
        const mappedSampleData = collection.sampleData.map(item => {
          const rowData: Record<string, any> = {}
          
          // Map each field in the sample data
          for (const field of collection.fields) {
            if (field.type !== FieldType.CONNECTOR) {
              const key = `${collection.title}-${field.name}`
              const [fieldId] = fieldIdMap.get(key) || []
              if (fieldId) {
                rowData[fieldId] = item[field.name] || null
              }
            }
          }

          return {
            gridCollectionId: gridId,
            title: '',
            customFields: rowData,
            createdAt: new Date(),
            createdBy: userId
          }
        })

        console.log('Mapped sample data:', mappedSampleData)

        // After mapping sample data
        const gridRowMap = new Map<string, Map<string, string>>() // Map<GridTitle, Map<DisplayValue, RowId>>
        const valueToIdMap = new Map<string, string>()
        gridRowMap.set(collection.title, valueToIdMap)

        // Insert all rows at once using createMany
        const result = await tx.grid.createMany({
          data: mappedSampleData
        })

        // // Get the created rows to build our value-to-id mapping
        // const createdRows = await tx.grid.findMany({
        //   where: { gridCollectionId: gridId },
        //   orderBy: { createdAt: 'desc' },
        //   take: mappedSampleData.length
        // })

        // console.log(`Created ${result.count} rows for ${collection.title}`)
      }

      return true
    } catch (error) {
      console.error('Template creation failed:', error)
      throw error
    }
  }
} 
