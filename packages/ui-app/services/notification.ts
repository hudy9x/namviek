import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { UserNotification } from '@shared/models'

export const notificationGet = (abortSignal?: AbortSignal) => {
  return httpGet(`/api/notificationToUser`, {
    signal: abortSignal
  })
}

export const notificationCreate = (data: Omit<UserNotification, 'id'>) => {
  return httpPost('/api/notificationToUser', data)
}

export const notificationUpdate = (data: UserNotification) => {
  return httpPut('/api/notificationToUser', data)
}

export const notificationDelete = (notificationId: string) => {
  return httpDel(`/api/notificationToUser/${notificationId}`)
}
