import { NotificationToUser } from '@prisma/client'
import { notificationModel, notificationToUserModel } from './_prisma'
import { UserNotification } from '../type'

export class NotificationToUserRepository {
  async addNotificationToUsers(data: Omit<NotificationToUser, 'id'>[]) {
    return notificationToUserModel.createMany({ data: data })
  }

  async getNotificationsToUser(userId: string, offset = 0, limit = 10) {
    console.log('before notificationToUserOnlys')
    const notificationToUserOnlys = (await notificationToUserModel.findMany({
      take: limit,
      skip: offset,
      where: { userId: { equals: userId } }
    })) as UserNotification[]

    const notifications = await notificationModel.findMany({
      where: {
        id: {
          in: notificationToUserOnlys.map(
            ({ notificationId }) => notificationId
          )
        }
      }
    })

    for (let i = 0; i < notificationToUserOnlys.length; i++) {
      const idx = notifications.findIndex(
        ({ id }) => id === notificationToUserOnlys[i].notificationId
      )
      if (idx < 0) continue

      notificationToUserOnlys[i].content = notifications[idx]
      notifications.splice(idx, 1)
    }

    return notificationToUserOnlys
  }

  async updateNotificationToUser(data: NotificationToUser) {
    const { id, ...rest } = data
    return notificationToUserModel.update({ where: { id }, data: rest })
  }
}
