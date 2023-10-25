import { DiscordWebhook } from '@prisma/client'
import { discordWebhookModel } from './_prisma'

export const mdDiscordWebhookAdd = async (data: Omit<DiscordWebhook, 'id'>) => {
  return discordWebhookModel.create({
    data: data
  })
}

export const mdDiscordWebhookGetOne = async (discordWebhookId: string) => {
  return discordWebhookModel.findFirst({
    where: {
      id: discordWebhookId
    }
  })
}

export const mdDiscordWebhookGetAll = async (projectId: string) => {
  return discordWebhookModel.findMany({
    where: {
      projectId: projectId
    }
  })
}

export const mdDiscordWebhookDelete = async (discordWebhookId: string) => {
  return discordWebhookModel.delete({
    where: {
      id: discordWebhookId
    }
  })
}
