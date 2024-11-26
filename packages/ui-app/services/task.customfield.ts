import { FieldType } from "@prisma/client"
import { httpPost, httpPut } from "./_req"
import { ExtendedTask } from "@/store/task"

export interface ICustomFieldData {
  [fieldId: string]: { value: string, type: FieldType }
}

export const taskCustomFieldSv = {
  update(data: { value: string | string[], taskId: string, fieldId: string, type: FieldType }) {
    return httpPut('/api/project/task/custom-field', data)
  },

  updateMany(
    taskIds: string[],
    data: ICustomFieldData) {
    return httpPut('/api/project/task/custom-field/update-many', {
      taskIds,
      data
    })
  },

  create(data: ExtendedTask) {
    return httpPost('/api/project/task/custom-field/create', data)
  }
}
