import Pusher from 'pusher'

let pusherServer: Pusher
let ready = false
const throwErrorMess = () => console.warn('Pusher channel secret & appId are missing')

const pusherConfig = {
  appId: process.env.PUSHER_CHANNEL_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_CHANNEL_APP_KEY,
  secret: process.env.PUSHER_CHANNEL_SECRET,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CHANNEL_APP_CLUSTER
}

if (Object.values(pusherConfig).every(Boolean)) {
  pusherServer = new Pusher(pusherConfig)
  ready = true
} else {
  ready = false
  throwErrorMess()
}

const _cannotPushNotification = () => {
  if (!ready) {
    throwErrorMess()
    return true
  }

  return false
}

export const pusherTrigger = (
  channel: string | Array<string>,
  event: string,
  data: any,
) => {
  if (_cannotPushNotification()) {
    return
  }
  pusherServer.trigger(channel, event, data)
}

export const pusherAuthorizeChannel = (socketId: string, channel: string) => {

  if (_cannotPushNotification()) {
    return
  }

  const authResponse = pusherServer.authorizeChannel(
    socketId,
    channel
    // presenceData
  )

  return authResponse
}
