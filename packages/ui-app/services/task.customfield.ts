import { FieldType } from "@prisma/client"
import { httpDel, httpGet, httpPost, httpPut } from "./_req"


export const taskCustomFieldSv = {
  // create(data: PartialTaskCheckList) {
  //   return httpPost('/api/project/task/checklist', data)
  // },
  // getByTaskId(taskId: string) {
  //   return httpGet(`/api/project/task/checklist/${taskId}`)
  // },
  // delete(id: string) {
  //   return httpDel(`/api/project/task/checklist/${id}`)
  // },
  update(data: { value: string | string[], taskId: string, fieldId: string, type: FieldType }) {
    return httpPut('/api/project/task/custom-field', data)
  }

}
