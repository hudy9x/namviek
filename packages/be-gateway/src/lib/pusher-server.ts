import Pusher from 'pusher'

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_CHANNEL_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_CHANNEL_APP_KEY,
  secret: process.env.PUSHER_CHANNEL_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CHANNEL_APP_CLUSTER
})
