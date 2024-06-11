import { connectSubClient } from '@shared/pubsub'
import { NotificationEvent } from './notification.event'
import { ReminderEvent } from './reminder.event'
import StatsByDayEvent from './stats.day.event'

export const CHANNEL_SCHEDULER_ACTION_NOTIFY = 'scheduler:action-notify'
export const CHANNEL_SCHEDULER_CREATE = 'scheduler:create'
export const CHANNEL_RUN_EVERY_MINUTE = 'fixed:run-every-minute'
export const CHANNEL_DAY_STATS = 'stats:day-stats'
export const EVENT = {
  SCHEDULER_DELETE: 'scheduler:delete'
}

connectSubClient((err, redis) => {
  if (err) {
    return
  }
  // We must subscribe channels first
  redis.subscribe(CHANNEL_SCHEDULER_ACTION_NOTIFY)
  redis.subscribe(CHANNEL_RUN_EVERY_MINUTE)
  redis.subscribe(CHANNEL_DAY_STATS)

  // After that, we can listen messages from them
  redis.on('message', async (channel: string, data: string) => {
    console.log('channel:', channel)
    if (channel === CHANNEL_SCHEDULER_ACTION_NOTIFY) {
      const event = new NotificationEvent()
      event.run(data)
    }
    if (channel === CHANNEL_RUN_EVERY_MINUTE) {
      const reminder = new ReminderEvent()
      reminder.run()
    }

    if (channel === CHANNEL_DAY_STATS) {
      const dayStats = new StatsByDayEvent()
      dayStats.run()
    }
  })
})
