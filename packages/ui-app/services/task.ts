import { Task } from '@prisma/client'
import { httpGet, httpPost, httpPut } from './_req'

type ITaskFields = Partial<Task>

export const taskGetAll = (projectId: string) => {
  return httpGet(`/api/project/task?projectId=${projectId}`)
}

interface TaskQuery {
  dueDate?: Date
  overdue?: Date
  assignees?: string[]
  statusIds?: string[]
}
export const taskGetByCond = (projectId: string, query: TaskQuery) => {
  return httpGet(`/api/project/task/query`, {
    params: {
      projectId,
      query
    }
  })
}

export const taskAdd = (data: ITaskFields) => {
  return httpPost('/api/project/task', data)
}

export const taskUpdate = (data: ITaskFields) => {
  return httpPut('/api/project/task', data)
}

export const taskAddMany = (data: {
  data: ITaskFields[]
  projectId: string
}) => {
  return httpPost('/api/project/tasks', data)
}
