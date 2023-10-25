import { DiscordWebhook } from '@prisma/client'
import { discordWebhookModel } from './_prisma'

export const mdDiscordWebhookAdd = async (data: Omit<DiscordWebhook, 'id'>) => {
  return discordWebhookModel.create({
    data: data
  })
}
