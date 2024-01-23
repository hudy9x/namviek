import Pusher from 'pusher-js'

export const pusherClient = new Pusher(
  process.env.NEXT_PUBLIC_PUSHER_CHANNEL_APP_KEY || '',
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CHANNEL_APP_CLUSTER || '',
    channelAuthorization: {
      transport: 'ajax',
      endpoint: '/api/buzzer/channel-auth'
    }
  }
)

export const channelTeamCollab = pusherClient.subscribe('team-collab')
