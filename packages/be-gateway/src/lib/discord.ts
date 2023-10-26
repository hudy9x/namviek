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

  return axios.post(webhookUrl, {
    content: message, embeds: [
      {
        title: title || 'Notification',
        description: "A new **task** has been created",
      }
    ]
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}
