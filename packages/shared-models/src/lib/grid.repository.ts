import { FieldType, Prisma, Task, TaskPriority, TaskType } from "@prisma/client"
import { gridModel } from "./_prisma"

export class GridRepository {

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

  async update(uid: string, { id, fieldId, value, type }: { id: string, type: FieldType, value: string | string[], fieldId: string }) {
    const oldTask = await gridModel.findFirst({ where: { id } })
    const oldCustomData = (oldTask.customFields || {}) as Prisma.JsonObject

    const result = await gridModel.update({
      where: {
        id
      },
      data: {
        updatedAt: new Date(),
        updatedBy: uid,
        customFields: {
          ...oldCustomData,
          [fieldId]: this.convertType(type, value)
        }
      }
    })

    console.log('update data', result)

    return result
  }

  async create(uid: string, data: Partial<Task>) {
    const newTask = await gridModel.create({
      data: {
        title: 'Untitled',
        cover: null,
        customFields: {},
        projectId: data.projectId,
        createdBy: uid,
        createdAt: new Date(),
        updatedAt: null,
        updatedBy: null,
      }
    });

    console.log('create data', newTask);

    return newTask;
  }

  async updateMultiField(uid: string, { id, data }: {
    id: string, data: {
      [fieldId: string]: { value: string, type: FieldType }
    }
  }) {

    const oldTask = await gridModel.findFirst({ where: { id } })
    const oldCustomData = (oldTask.customFields || {}) as Prisma.JsonObject

    const convertedData = {}

    for (const key in data) {
      const dt = data[key]
      convertedData[key] = this.convertType(dt.type, dt.value)
    }

    console.log('convertedDAta', convertedData)

    const result = await gridModel.update({
      where: {
        id
      },
      data: {
        updatedAt: new Date(),
        updatedBy: uid,
        customFields: {
          ...oldCustomData,
          ...convertedData
        }
      }
    })


    return result
  }
}
