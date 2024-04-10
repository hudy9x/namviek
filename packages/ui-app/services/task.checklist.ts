import { TaskChecklist } from "@prisma/client"
import { httpDel, httpGet, httpPost, httpPut } from "./_req"

type PartialTaskCheckList = Partial<TaskChecklist>

export const taskChecklistSv = {
  create(data: PartialTaskCheckList) {
    return httpPost('/api/project/task/checklist', data)
  },
  getByTaskId(taskId: string) {
    return httpGet(`/api/project/task/checklist/${taskId}`)
  },
  delete(id: string) {
    return httpDel(`/api/project/task/checklist/${id}`)
  },
  update(data: PartialTaskCheckList) {
    return httpPut('/api/project/task/checklist', data)
  }

}
