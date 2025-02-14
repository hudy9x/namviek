import { Field } from '@prisma/client'
import { fieldModel, pmClient } from './_prisma'


export class FieldRepository {

  async getAllByProjectId(projectId: string) {
    return fieldModel.findMany({
      where: {
        projectId
      }
    })
  }

  async countProjectCustomField(projectId: string) {

    return fieldModel.count({
      where: {
        projectId
      }
    })
  }

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

  async delete(id: string, projectId: string) {
    // return fieldModel.delete({ where: { id } })


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

        console.log('id', id)
        console.log('field.projectId', projectId)
        
        // 2. Cleanup customFields in all Grid records using update command
        const result = await pmClient.$runCommandRaw({
          update: "Grid",
          updates: [
            {
              q: { 
                projectId: { $oid: projectId }, 
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
}
