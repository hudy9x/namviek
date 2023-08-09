import { Task, TaskPriority } from '@prisma/client'
import { httpGet, httpPost, httpPut } from './_req'

type ITaskFields = Partial<Task>

export const taskGetAll = (projectId: string, signal?: AbortSignal) => {
  const config: { [key: string]: unknown } = {}
  if (signal) {
    config.signal = signal
  }
  return httpGet(`/api/project/task?projectId=${projectId}`, config)
}

interface ITaskQuery {
  projectId?: string
  title?: string
  dueDate?: [Date | undefined, Date | undefined]
  assigneeIds?: string[]
  statusIds?: string[]
  taskPoint?: number
  priority?: TaskPriority
  take?: number
  skip?: number
  orderBy?: [string, 'asc' | 'desc']
}

export const taskGetByCond = (query: ITaskQuery) => {
  return httpGet(`/api/project/task-query`, {
    params: query
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
