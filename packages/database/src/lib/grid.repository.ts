import { FieldType, Grid, Prisma } from "@prisma/client"
import { gridModel } from "./_prisma"

export class GridRepository {

  convertType(type: FieldType, value: string | string[]) {
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
    const oldCustomFields = oldTask && oldTask.customFields ? oldTask.customFields : {}
    const oldCustomData = oldCustomFields as Prisma.JsonObject

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

  async create(uid: string, data: Partial<Grid>) {
    const newTask = await gridModel.create({
      data: {
        title: 'Untitled',
        cover: null,
        customFields: data.customFields || {},
        projectId: data.projectId || '',
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
    const oldCustomFields = oldTask && oldTask.customFields ? oldTask.customFields : {}
    const oldCustomData = oldCustomFields as Prisma.JsonObject

    const convertedData: Record<string, string | number | string[]> = {}

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

  async createMany(uid: string, data: {
    projectId: string,
    rows: { customFields: Record<string, any> }[]
  }) {
    const now = new Date();
    const tasks = data.rows.map(row => ({
      title: 'Untitled',
      cover: null,
      customFields: row.customFields,
      projectId: data.projectId,
      createdBy: uid,
      createdAt: now,
      updatedAt: null,
      updatedBy: null,
    }));

    const result = await gridModel.createMany({
      data: tasks
    });

    console.log('create many data', result);

    return result;
  }

  async deleteMany(rowIds: string[]) {
    const result = await gridModel.deleteMany({
      where: {
        id: { in: rowIds }
      }
    })
    return result
  }

}
