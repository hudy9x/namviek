import { Field } from '@prisma/client'
import { fieldModel, pmClient } from './_prisma'


export class FieldRepository {

  async create(data: Omit<Field, 'id'>) {

    return fieldModel.create({
      data
    })
  }

  async update(fieldId: string, data: Partial<Field>) {
    const { id, ...restData } = data
    return fieldModel.update({
      where: { id: fieldId },
      data: restData
    })
  }

  async delete(id: string) {
    try {
      // Get field info first
      const field = await pmClient.field.findUnique({
        where: { id }
      })
      
      if (!field) {
        throw new Error('Field not found')
      }

      await pmClient.$transaction(async (tx) => {
        // 1. Delete the field
        await tx.field.delete({
          where: { id }
        })
        
        // 2. Cleanup customFields in all Grid records
        const result = await pmClient.$runCommandRaw({
          update: "Grid",
          updates: [
            {
              q: { 
                gridCollectionId: field.gridCollectionId,
                [`customFields.${id}`]: { $exists: true }
              },
              u: { 
                $unset: { [`customFields.${id}`]: "" }
              },
              multi: true
            }
          ],
          ordered: false,
          writeConcern: { w: "majority", wtimeout: 5000 }
        })

        console.log('result', result)
      })

      console.log('Field deleted successfully 2')

    } catch (error) {
      console.error('Error deleting field:', error) 
      throw error
    }
  }

  async getAllByGridCollectionId(gridCollectionId: string) {
    return fieldModel.findMany({
      where: {
        gridCollectionId
      }
    })
  }
}
