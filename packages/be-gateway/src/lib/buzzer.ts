import PushNotifications, {
  WebNotificationPayload
} from '@pusher/push-notifications-server'

const beamsClient = new PushNotifications({
  instanceId: process.env.PUSHER_INSTANCE_ID,
  secretKey: process.env.PUSHER_SECRET_KEY
})

export const generateBuzzerToken = (uid: string) => {
  const beamsToken = beamsClient.generateToken(uid)
  return beamsToken
}

export const notifyToUsers = (
  uid: string | string[],
  opts: PushNotifications.PublishRequest
) => {
  const uids = Array.isArray(uid) ? uid : [uid]
  return beamsClient.publishToUsers(uids, opts)
}

export const notifyToWebUsers = (
  uid: string | string[],
  opts: WebNotificationPayload
) => {
  const uids = Array.isArray(uid) ? uid : [uid]
  return beamsClient.publishToUsers(uids, {
    web: {
      // notification: opts
      notification: opts
    }
  })
}
