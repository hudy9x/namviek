import { FieldType, Prisma } from "@prisma/client"
import { taskModel } from "./_prisma"

export class TaskCustomFieldRepository {

  private convertType(type: FieldType, value: string | string[]) {
    if (type === FieldType.MULTISELECT && Array.isArray(value)) {
      return value
    }
    if (type === FieldType.NUMBER) {
      return +value
    }

    if (type === FieldType.DATE && !Array.isArray(value)) {
      console.log('date', new Date(value))
      return new Date(value).toISOString()
    }

    return value
  }

  async update({ id, fieldId, value, type }: { id: string, type: FieldType, value: string | string[], fieldId: string }) {
    const oldTask = await taskModel.findFirst({ where: { id } })
    const oldCustomData = (oldTask.customFields || {}) as Prisma.JsonObject

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

  async updateMultiField({ id, data }: {
    id: string, data: {
      [fieldId: string]: { value: string, type: FieldType }
    }
  }) {

    const oldTask = await taskModel.findFirst({ where: { id } })
    const oldCustomData = (oldTask.customFields || {}) as Prisma.JsonObject

    const convertedData = {}

    for (const key in data) {
      const dt = data[key]
      convertedData[key] = this.convertType(dt.type, dt.value)
    }

    console.log('convertedDAta', convertedData)

    const result = await taskModel.update({
      where: {
        id
      },
      data: {
        customFields: {
          ...oldCustomData,
          ...convertedData
        }
      }
    })


    return result
  }
}
