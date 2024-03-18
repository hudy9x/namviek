import 'dotenv/config'
import { connectPubClient, connectSubClient } from '@shared/pubsub'
import { SchedulerAction } from './scheduler'
import { NotificationAction } from './actions/NotificationAction'
import { cronJob } from './cronJob'

connectPubClient((err, redis) => {
  if (err) return
  // for fixed cronjobs
  const fixedCronId = 'fixed-cron-id'
  cronJob.create(fixedCronId, { every: 'minute' }, () => {
    const CHANNEL_RUN_EVERY_MINUTE = 'fixed:run-every-minute'
    redis.publish(CHANNEL_RUN_EVERY_MINUTE, 'Hello')
  })
})

connectSubClient((err, redis) => {
  if (err) {
    console.log(err)
    return
  }

  // for automation scheduler that was setting up be each project
  const schedulerAction = new SchedulerAction(redis)
  schedulerAction.register(new NotificationAction())
  schedulerAction.run()
})
