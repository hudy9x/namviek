import axios from 'axios'


export const sendNotification = async (message: string) => {
  const url = process.env.DISCORD_WEBHOOK_URL || ''
  console.log('start sending webhook discord')
  return axios.post(url, {
    content: message, embeds: [
      {
        title: "New Task",
        description: "A new **task** has been created",
      }
    ]
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })
}
