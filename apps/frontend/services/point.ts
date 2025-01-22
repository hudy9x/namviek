import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { TaskPoint } from '@prisma/client'

export const projectPointGet = (
  projectId: string,
  abortSignal?: AbortSignal
) => {
  return httpGet(`/api/project/point/${projectId}`, {
    signal: abortSignal
  })
}

export const projectPointCreate = (data: Omit<TaskPoint, 'id'>) => {
  return httpPost('/api/project/point', data)
}

export const projectPointUpdate = (data: TaskPoint) => {
  // console.log({ data })
  // return httpPut('/api/project/point', { data: data })
  return httpPut('/api/project/point', data)
}

export const projectPointDelete = (pointId: string) => {
  return httpDel(`/api/project/point/${pointId}`)
}
