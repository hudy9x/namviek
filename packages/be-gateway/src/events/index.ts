import { connectSubClient } from '@shared/pubsub'
import { NotificationEvent } from './notification.event'

export const CHANNEL_SCHEDULER_ACTION_NOTIFY = 'scheduler:action-notify'
export const CHANNEL_SCHEDULER_CREATE = 'scheduler:create'
export const EVENT = {
  SCHEDULER_DELETE: 'scheduler:delete'
}

connectSubClient((err, redis) => {
  if (err) {
    return
  }
  redis.subscribe(CHANNEL_SCHEDULER_ACTION_NOTIFY, (err, count) => {
    console.log('subscribed', CHANNEL_SCHEDULER_ACTION_NOTIFY)
  })

  redis.on('message', async (channel: string, data: string) => {
    if (channel === CHANNEL_SCHEDULER_ACTION_NOTIFY) {
      const event = new NotificationEvent()
      event.run(data)
    }
  })
})
