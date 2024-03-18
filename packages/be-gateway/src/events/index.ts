import { connectSubClient } from '@shared/pubsub'
import { NotificationEvent } from './notification.event'
import { ReminderEvent } from './reminder.event'

export const CHANNEL_SCHEDULER_ACTION_NOTIFY = 'scheduler:action-notify'
export const CHANNEL_SCHEDULER_CREATE = 'scheduler:create'
export const CHANNEL_RUN_EVERY_MINUTE = 'fixed:run-every-minute'
export const EVENT = {
  SCHEDULER_DELETE: 'scheduler:delete'
}

connectSubClient((err, redis) => {
  if (err) {
    return
  }
  // We must subscribe channels first
  redis.subscribe(CHANNEL_SCHEDULER_ACTION_NOTIFY, (err, count) => {
    console.log('subscribed', CHANNEL_SCHEDULER_ACTION_NOTIFY)
  })

  redis.subscribe(CHANNEL_RUN_EVERY_MINUTE)

  // After that, we can listen messages from them
  redis.on('message', async (channel: string, data: string) => {
    if (channel === CHANNEL_SCHEDULER_ACTION_NOTIFY) {
      const event = new NotificationEvent()
      event.run(data)
    }
    if (channel === CHANNEL_RUN_EVERY_MINUTE) {
      const reminder = new ReminderEvent()
      reminder.run()
    }
  })
})
