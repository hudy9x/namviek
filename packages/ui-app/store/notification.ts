import { create } from 'zustand'
import { produce } from 'immer'
import { UserNotification } from '@shared/models'

interface NotificationState {
  notifications: UserNotification[]
  addAllNotifications: (data: UserNotification[]) => void
  addNotification: (data: UserNotification) => void
  updateNotification: (id: string, newData: Partial<UserNotification>) => void
}

export const useNotificationStore = create<NotificationState>(set => ({
  notifications: [],
  addAllNotifications: (data: UserNotification[]) =>
    set(
      produce((state: NotificationState) => {
        state.notifications = data
      })
    ),

  addNotification: data =>
    set(
      produce((state: NotificationState) => {
        state.notifications.push(data)
      })
    ),

  updateNotification: (id, newData) =>
    set(
      produce((state: NotificationState) => {
        state.notifications.forEach((notification, index) => {
          if (id === notification.id) {
            state.notifications[index] = { ...notification, ...newData }
          }
        })
      })
    )
}))
