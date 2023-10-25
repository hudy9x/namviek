import { DiscordNotification } from '@prisma/client'
import { httpPost } from './_req'

export const discordNotificationAdd = (data: Omit<DiscordNotification, 'id'>) => {
  return httpPost('/api/project/discord-notification', data)
}
