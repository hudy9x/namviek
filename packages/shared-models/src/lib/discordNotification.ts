import { DiscordNotification } from '@prisma/client'
import { discordNotificationModel } from './_prisma'

export const mdDiscordNotificationAdd = async (data: Omit<DiscordNotification, 'id'>) => {
  return discordNotificationModel.create({
    data: data
  })
}
