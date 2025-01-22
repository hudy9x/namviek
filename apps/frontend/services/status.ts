import { TaskStatus } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'

export const projectStatusGet = (
  projectId: string,
  abortSignal?: AbortSignal
) => {
  return httpGet(`/api/project/status/${projectId}`, {
    signal: abortSignal
  })
}

export const projectStatusAdd = (data: TaskStatus) => {
  return httpPost(`/api/project/status/${data.projectId}`, data)
}

interface NewStatusOrder {
  id: string
  order: number
}

export const projectStatusUpdateOrder = (newOrders: NewStatusOrder[]) => {
  return httpPut('/api/project/status/order', {
    newOrders
  })
}

export const projectStatusUpdate = (data: Partial<TaskStatus>) => {
  return httpPut('/api/project/status', data)
}

export const projectStatusDel = (id: string) => {
  return httpDel(`/api/project/status/${id}`)
}
