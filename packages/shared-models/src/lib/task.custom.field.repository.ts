import { FieldType, Prisma, Task, TaskPriority, TaskType } from "@prisma/client"
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

  async update(uid: string, { id, fieldId, value, type }: { id: string, type: FieldType, value: string | string[], fieldId: string }) {
    const oldTask = await taskModel.findFirst({ where: { id } })
    const oldCustomData = (oldTask.customFields || {}) as Prisma.JsonObject

    const result = await taskModel.update({
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
    const newTask = await taskModel.create({
      data: {
        title: '',
        cover: null,
        order: 1,
        type: TaskType.TASK,
        startDate: null,
        dueDate: null,
        plannedStartDate: null,
        plannedDueDate: null,
        assigneeIds: [],
        checklistDone: 0,
        checklistTodos: 0,
        desc: '',
        done: false,
        customFields: {},
        fileIds: [],
        projectId: data.projectId,
        priority: TaskPriority.LOW,
        taskStatusId: null,
        tagIds: [],
        visionId: null,
        parentTaskId: null,
        taskPoint: null,
        createdBy: uid,
        createdAt: new Date(),
        updatedAt: null,
        updatedBy: null,
        progress: 0
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
