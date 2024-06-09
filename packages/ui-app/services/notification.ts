import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { Notification } from '@prisma/client'

export const notificationGet = (abortSignal?: AbortSignal) => {
  return httpGet(`/api/notificationToUser`, {
    signal: abortSignal
  })
}

export const notificationCreate = (data: Omit<Notification, 'id'>) => {
  return httpPost('/api/notificationToUser', data)
}

export const notificationUpdate = (data: Notification) => {
  return httpPut('/api/notificationToUser', data)
}

export const notificationDelete = (notificationId: string) => {
  return httpDel(`/api/notificationToUser/${notificationId}`)
}
