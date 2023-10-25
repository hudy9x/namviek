import React from 'react'
import DiscordWebhookForm from './DiscordWebhookForm'
import { DiscordWebhook } from '@prisma/client'
import { discordWebhookAdd } from '@/services/discordWebhook'

export interface IDiscordWebhookDefaultValues {
  url: string
  botName: string
  botIcon: string
  enabled: boolean
}

export const defaultFormikValues: IDiscordWebhookDefaultValues = {
  url: '',
  botName: '',
  botIcon: '',
  enabled: true
}

export default function DiscordWebhookContainer() {
  const onSubmit = (v: Omit<DiscordWebhook, 'id'>) => {
    discordWebhookAdd(v)
  }

  return (
    <DiscordWebhookForm
      defaultValue={defaultFormikValues}
      onSubmit={onSubmit}
    />
  )
}
