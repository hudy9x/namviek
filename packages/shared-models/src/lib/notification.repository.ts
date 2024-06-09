import { Notification, NotificationToUser } from '@prisma/client'
import { notificationModel, notificationToUserModel } from './_prisma'
import { NotificationToUserRepository } from './notificationToUser.repository'

export class NotificationRepository {
  notificationToUserRepo: NotificationToUserRepository
  constructor() {
    this.notificationToUserRepo = new NotificationToUserRepository()
  }

  async getNotificationsByUser(userId: string) {
    return notificationToUserModel.findMany({ where: { id: userId } })
  }

  async addNotification(data: Omit<Notification, 'id'>, userIds: string[]) {
    const notification = await notificationModel.create({ data: data })
    const { id: notificationId } = notification
    this.notificationToUserRepo.addNotificationToUsers(
      userIds.map(userId => ({ notificationId, userId, isRead: false }))
    )
    return notification
  }

  async updateNotification(data: Notification) {
    const { id, ...rest } = data
    return notificationModel.update({ data: rest, where: { id } })
  }
}
