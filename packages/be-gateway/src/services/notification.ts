import { NotificationRepository } from '@shared/models'
import { CKEY, hgetAll, hset } from '../lib/redis'

const notificationRepo = new NotificationRepository()
export const serviceGetNotificationById = async (id: string) => {
  const key = [CKEY.PROJECT, id]
  const cached = await hgetAll(key)

  if (cached) return cached

  const result = await notificationRepo.getNotificationsByUser(id)

  await hset(key, result)

  return result
}
