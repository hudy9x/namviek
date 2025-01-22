import { Field } from '@prisma/client'
import { fieldModel } from './_prisma'


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

  async delete(id: string) {
    return fieldModel.delete({ where: { id } })
  }
}
