import { TaskChecklist } from "@prisma/client"
import { httpGet, httpPost } from "./_req"

export const taskChecklistSv = {
  create(data: Partial<TaskChecklist>) {
    return httpPost('/api/project/task/checklist', data)
  },
  getByTaskId(taskId: string) {
    return httpGet(`/api/project/task/checklist/${taskId}`)
  }
}
