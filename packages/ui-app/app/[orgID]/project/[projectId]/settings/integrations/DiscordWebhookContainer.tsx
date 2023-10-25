import React from 'react'
import DiscordWebhookForm from './DiscordWebhookForm'

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
  return <DiscordWebhookForm defaultValue={defaultFormikValues} />
}
