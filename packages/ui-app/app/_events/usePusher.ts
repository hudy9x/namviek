import Pusher, { Channel } from 'pusher-js'
import { useEffect, useState } from 'react'

export const usePusher = () => {
  const [channelTeamCollab, setChannelTeamCollab] = useState<Channel>()
  useEffect(() => {

    const pusherClient = new Pusher(
      process.env.NEXT_PUBLIC_PUSHER_CHANNEL_APP_KEY || '',
      {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CHANNEL_APP_CLUSTER || '',
        // channelAuthorization: {
        //   transport: 'ajax',
        //   endpoint: `${process.env.NEXT_PUBLIC_BE_GATEWAY}api/buzzer/channel-auth`
        // }

      }
    )


    const channel = pusherClient.subscribe('team-collab')

    setChannelTeamCollab(channel)

  }, [])

  return {
    channelTeamCollab
  }
}
