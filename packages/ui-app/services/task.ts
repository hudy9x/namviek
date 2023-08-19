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

export interface ITaskQuery {
  projectId?: string
  title?: string
  dueDate?: [Date | string, Date | string]
  assigneeIds?: string[]
  statusIds?: string[]
  taskPoint?: number
  priority?: TaskPriority
  take?: number
  skip?: number
  orderBy?: [string, 'asc' | 'desc']
  counter?: boolean
}

export const taskGetByCond = (query: ITaskQuery, signal?: AbortSignal) => {
  return httpGet(`/api/project/task-query`, {
    params: query,
    signal: signal
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
