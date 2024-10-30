import { FieldType, Prisma } from "@prisma/client"
import { taskModel } from "./_prisma"

export class TaskCustomFieldRepository {

  private convertType(type: FieldType, value: string) {
    if (type === FieldType.NUMBER) {
      return +value
    }

    if (type === FieldType.DATE) {
      console.log('date', new Date(value))
      return new Date(value)
    }

    return value
  }

  async update({ id, fieldId, value, type }: { id: string, type: FieldType, value: string, fieldId: string }) {
    const oldTask = await taskModel.findFirst({ where: { id } })
    const oldCustomData = (oldTask.customFields || {}) as Prisma.JsonObject
    console.log('type', type)
    const result = await taskModel.update({
      where: {
        id
      },
      data: {
        customFields: {
          ...oldCustomData,
          [fieldId]: this.convertType(type, value)
        }
      }
    })

    console.log('update data', result)

    return result
  }
}
