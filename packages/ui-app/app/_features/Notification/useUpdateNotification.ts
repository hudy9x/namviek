import { useNotificationStore } from '@/store/notification'
import { useUser } from '@goalie/nextjs'
import localforage from 'localforage'

import { notificationUpdate } from '@/services/notification'
import { messageError } from '@shared/ui'
export const useUpdateNotification = () => {
  const { notifications, updateNotification } = useNotificationStore()
  const { user } = useUser()
  const updateNotificationRead = (id: string) => {
    const idx = notifications.findIndex(({ id: nid }) => nid === id)
    if (idx < 0) return

    const { content, ...toUpdateNotfication } = { ...notifications[idx] }
    notificationUpdate({ ...toUpdateNotfication, isRead: true }).then(res => {
      const { data, status, error } = res.data
      console.log({ notificationUpdate: data })

      if (status !== 200) {
        messageError(error)
        return
      }
      const key = `NOTIFICATIONLIST_${user?.id}`

      updateNotification(notifications[idx].id, notifications[idx])

      localforage.setItem(key, notifications)
    })
  }
  return { updateNotificationRead }
}
