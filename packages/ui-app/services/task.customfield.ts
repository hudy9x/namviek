import { FieldType } from "@prisma/client"
import { httpPut } from "./_req"

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
  }

}
