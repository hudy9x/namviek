import React from 'react'
import DiscordNotificationForm from './DiscordNotificationForm'

export interface IDiscordNotificationDefaultValues {
  discordWebhookUrl: string
  discordWebhookName: string
  discordWebhookIcon: string
  enabled: boolean
}

export const defaultFormikValues: IDiscordNotificationDefaultValues = {
  discordWebhookUrl: '',
  discordWebhookName: '',
  discordWebhookIcon: '',
  enabled: true
}

export default function DiscordNotificationContainer() {
  return <DiscordNotificationForm defaultValue={defaultFormikValues} />
}
