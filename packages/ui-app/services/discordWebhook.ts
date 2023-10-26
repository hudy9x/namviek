import { DiscordWebhook } from '@prisma/client'
import { httpPost } from './_req'

export interface IDiscordWebhookQuery {
  discordWebhookId?: string
  projectId?: string
}

export const discordWebhookAdd = (data: Omit<DiscordWebhook, 'id'>) => {
  return httpPost('/api/project/discord-webhooks', data)
}

export const discordWebhookUpdate = (data: Omit<DiscordWebhook, 'id'>) => {
  return httpPost('/api/project/discord-webhooks', data)
}

export const discordWebhookGetOne = (
  query: IDiscordWebhookQuery,
  abortSignal?: AbortSignal
) => {
  return httpPost('/api/project/discord-webhooks/query', {
    params: query,
    signal: abortSignal
  })
}

export const discordWebhookGetMany = (
  query: string,
  abortSignal?: AbortSignal
) => {
  return httpPost(`/api/project/discord-webhooks`, {
    params: query,
    signal: abortSignal
  })
}

export const discordWebhookDelete = (data: Omit<DiscordWebhook, 'id'>) => {
  return httpPost('/api/project/discord-webhooks', data)
}
