import PushNotifications, {
  WebNotificationPayload
} from '@pusher/push-notifications-server'
import { getLogoUrl } from './url'

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

  console.log('notify to web users', uid, opts)
  const uids = Array.isArray(uid) ? uid : [uid]

  if (!opts.title) {
    opts.title = 'Taffyo'
  }

  if (!opts.icon) {
    opts.icon = getLogoUrl()
  }

  return beamsClient.publishToUsers(uids, {
    web: {
      // notification: opts
      notification: opts
    }
  })
}
