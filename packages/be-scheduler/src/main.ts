import 'dotenv/config'
import { connectPubClient, connectSubClient } from '@shared/pubsub'
import { SchedulerAction } from './scheduler'
import { NotificationAction } from './actions/NotificationAction'
import { cronJob } from './cronJob'

connectPubClient((err, redis) => {
  if (err) return

  // run every minute
  const fixedCronId = 'fixed-cron-id'
  cronJob.create(fixedCronId, { every: 'minute' }, () => {
    const CHANNEL_RUN_EVERY_MINUTE = 'fixed:run-every-minute'
    redis.publish(CHANNEL_RUN_EVERY_MINUTE, 'Hello')
  })

  cronJob.create('testing-cronjob', { every: 'minute' }, () => {
    // testing 
    const CHANNEL_DAY_STATS = 'stats:day-stats'
    redis.publish(CHANNEL_DAY_STATS, 'heelo')
  })


  // run every 20pm
  const runAt20h = 'runAt20pm'
  cronJob.create(runAt20h, {
    every: 'day',
    at: { hour: 20, minute: 0, period: 'pm' }
  }, () => {
    const CHANNEL_DAY_STATS = 'stats:day-stats'
    redis.publish(CHANNEL_DAY_STATS, '')
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
