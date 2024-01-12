import 'dotenv/config'
import { connectPubClient, connectSubClient } from '@shared/pubsub'
import { SchedulerAction } from './scheduler'
import { NotificationAction } from './actions/NotificationAction'


connectPubClient()
connectSubClient((err, redis) => {
  if (err) {
    console.log(err)
    return
  }

  const schedulerAction = new SchedulerAction(redis)
  schedulerAction.register(new NotificationAction())
  schedulerAction.run()
})
