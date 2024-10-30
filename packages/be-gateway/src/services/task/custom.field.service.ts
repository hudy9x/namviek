import { FieldType } from "@prisma/client"
import { TaskCustomFieldRepository } from "@shared/models"

export default class TaskCustomFieldService {
  taskCustomRepo: TaskCustomFieldRepository
  constructor() {
    this.taskCustomRepo = new TaskCustomFieldRepository()
  }

  async update(body: { value: string, taskId: string, fieldId: string, type: FieldType }) {
    try {
      const result = await this.taskCustomRepo.update({
        id: body.taskId,
        type: body.type,
        value: body.value,
        fieldId: body.fieldId
      })

      return result
    } catch (error) {
      console.log('Update Custom field error:', error)
      return null
    }
  }
}
