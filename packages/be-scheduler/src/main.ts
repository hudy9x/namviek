import 'dotenv/config'
import { connectPubClient, connectSubClient } from '@shared/pubsub'
import { SchedulerAction } from './scheduler'
import { NotificationAction } from './actions/NotificationAction'
import { cronJob } from './cronJob'

async function sendNotice(content: string) {
  const data = {
    username: 'Scheduler',
    avatar_url: "",
    content
  }
  return fetch("https://discord.com/api/webhooks/1249577190626955284/QWVUtgJVOj6JVqlRb7qyZ-MoIKYRUhUm94hXLxXPMi3a23XSmlGfeyPo40x7hHPmlEts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
}

connectPubClient((err, redis) => {
  if (err) return

  // run every minute
  const fixedCronId = 'fixed-cron-id'
  cronJob.create(fixedCronId, { every: 'minute' }, () => {
    const CHANNEL_RUN_EVERY_MINUTE = 'fixed:run-every-minute'
    // sendNotice(CHANNEL_RUN_EVERY_MINUTE)
    redis.publish(CHANNEL_RUN_EVERY_MINUTE, 'Hello')
  })

  // run every 20pm
  const runAt20h = 'runAt20pm'
  cronJob.create(runAt20h, '5 12,18,20 * * *', () => {
    // cronJob.create(runAt20h, { every: "minute" }, () => {
    const CHANNEL_DAY_STATS = 'stats:day-stats'
    redis.publish(CHANNEL_DAY_STATS, 'heelo')
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
