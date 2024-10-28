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

  async create(data: Omit<Field, 'id'>) {

    return fieldModel.create({
      data
    })
  }

  async update(id: string, data: Partial<Field>) {
    return fieldModel.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return fieldModel.delete({ where: { id } })
  }
}
