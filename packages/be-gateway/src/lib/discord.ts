import { DiscordWebhook } from '@prisma/client'
import axios from 'axios'

export interface IDiscordNotification extends DiscordWebhook {
  title: string
  message: string
}


export const sendNotification = async (data: Partial<IDiscordNotification>) => {
  const { url, botName, botIcon, message, title } = data
  const webhookUrl = url || ''
  console.log('start sending webhook discord')


  const discordParams = {
    ...(botName && { username: botName }),
    ...(botIcon && { avatar_url: botIcon }),
    embeds: [
      {
        title: title || 'Notification',
        description: message || "Congrats! You just send a notification by Kapuni",
      }
    ]
  }

  return axios.post(webhookUrl, discordParams, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}
