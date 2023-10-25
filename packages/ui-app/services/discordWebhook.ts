import { DiscordWebhook } from '@prisma/client'
import { httpPost } from './_req'

export const discordWebhookAdd = (data: Omit<DiscordWebhook, 'id'>) => {
  return httpPost('/api/project/discord-webhook', data)
}
