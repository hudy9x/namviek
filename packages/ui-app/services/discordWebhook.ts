import { DiscordWebhook } from '@prisma/client'
import { httpDel, httpGet, httpPost, httpPut } from './_req'
import { IDiscordWebhookDefaultValues } from '../app/[orgID]/project/[projectId]/settings/integrations/DiscordWebhookContainer'


type IDiscordWebhookField = Partial<DiscordWebhook>
export interface IDiscordWebhookQueryGetOne {
  discordWebhookId?: string
}
export interface IDiscordWebhookQueryGetMany {
  projectId?: string
}


export const discordWebhookAdd = (data: IDiscordWebhookField) => {
  return httpPost('/api/project/discord-webhooks', data)
}

export const discordWebhookUpdate = (data: IDiscordWebhookField) => {
  return httpPut('/api/project/discord-webhooks', data)
}

export const discordWebhookGetOne = (
  query: IDiscordWebhookQueryGetOne,
  abortSignal?: AbortSignal
) => {
  return httpGet('/api/project/discord-webhooks/query', {
    params: query,
    signal: abortSignal
  })
}

export const discordWebhookGetMany = (
  query: IDiscordWebhookQueryGetMany,
  abortSignal?: AbortSignal
) => {
  return httpGet(`/api/project/discord-webhooks`, {
    params: query,
    signal: abortSignal
  })
}

export const discordWebhookDelete = (data: IDiscordWebhookField) => {
  return httpDel('/api/project/discord-webhooks', data)
}

export const discordWebhookSendNotification = (data: IDiscordWebhookDefaultValues) => {
  return httpPost('/api/project/discord-webhooks/send-noti', data)
}
