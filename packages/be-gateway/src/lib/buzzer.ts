import PushNotifications, {
  WebNotificationPayload
} from '@pusher/push-notifications-server'
import { getLogoUrl } from './url'

let beamsClient: PushNotifications
let ready = false
const throwErrMess = () => console.warn('Pusher beams secret is missing')

try {
  const pusherConfig = {
    instanceId: process.env.PUSHER_INSTANCE_ID,
    secretKey: process.env.PUSHER_SECRET_KEY
  }
  if (Object.values(pusherConfig).every(Boolean)) {
    beamsClient = new PushNotifications(pusherConfig)
    ready = true
  } else {
    throwErrMess()
  }

} catch (error) {
  throwErrMess()
}

const _cannotPushNotification = () => {
  if (!ready) {
    throwErrMess()
    return true
  }

  return false
}

export const generateBuzzerToken = (uid: string) => {
  if (_cannotPushNotification()) return
  const beamsToken = beamsClient.generateToken(uid)
  return beamsToken
}

export const notifyToUsers = (
  uid: string | string[],
  opts: PushNotifications.PublishRequest
) => {
  if (_cannotPushNotification()) return
  const uids = Array.isArray(uid) ? uid : [uid]
  return beamsClient.publishToUsers(uids, opts)
}

export const notifyToWebUsers = (
  uid: string | string[],
  opts: WebNotificationPayload
) => {
  if (_cannotPushNotification()) return
  console.log('notify to web users', uid, opts)
  const uids = Array.isArray(uid) ? uid : [uid]

  if (!uids.length) return

  if (!opts.title) {
    opts.title = process.env.NEXT_PUBLIC_APP_NAME
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
