import { connectPubClient, connectSubClient } from '@shared/pubsub'
import { SchedulerAction } from './scheduler'
import { NotificationAction } from './actions/NotificationAction'

// const cronList = new Map<string, ScheduledTask>()
//
// const scheduleRepo = new SchedulerRepository()
//
// connectPubClient()
//
// const CHANNEL_SCHEDULER_ACTION_NOTIFY = 'scheduler:action-notify'
// const CHANNEL_SCHEDULER_CREATE = 'scheduler:create'
// export const EVENT = {
//   SCHEDULER_DELETE: 'scheduler:delete'
// }
//
// const showAllCronKey = () => {
//   for (const key of cronList.keys()) {
//     console.log('cron:', key)
//   }
// }
//
// const fetchNRunAllScheduler = () => {
//   scheduleRepo.findAll().then(res => {
//     console.log('fetched all schedulers')
//     res.forEach(result => {
//       const cronId = result.cronId
//       if (cronId) {
//         createCronjob(cronId, result)
//       }
//     })
//     showAllCronKey()
//   })
// }
//
// type TTrigger = {
//   every:
//   | 'day'
//   | 'weekday'
//   | 'mon'
//   | 'tue'
//   | 'wed'
//   | 'thu'
//   | 'fri'
//   | 'sat'
//   | 'sun'
//   at: { hour: number; minute: number; period: 'am' | 'pm' }
// }
//
// const generateCronPattern = (trigger: TTrigger) => {
//   const { every, at } = trigger
//   const { hour, minute, period } = at
//
//   let time: string[] = []
//
//   if (hour && minute && period) {
//     time.push(minute + '')
//     time.push(hour + (period === 'pm' ? 12 : 0) + '')
//   } else {
//     time.push('*') // minute
//     time.push('*') // hour
//   }
//
//   switch (every) {
//     case 'day':
//       time = [...time, ...['*', '*', '*']]
//       break
//
//     case 'weekday':
//       time = [...time, ...['*', '*', '1-5']]
//       break
//
//     case 'mon':
//     case 'tue':
//     case 'wed':
//     case 'thu':
//     case 'fri':
//     case 'sat':
//     case 'sun':
//       time = [...time, ...['*', '*', every]]
//       break
//
//     default:
//       time = ['*', '*', '*']
//       break
//   }
//
//   return time.join(' ')
// }
//
// type TActionNotifyConfig = {
//   [key: string]: unknown
// }
//
// const actionNotification = (projectId: string, config: TActionNotifyConfig) => {
//   publish(
//     CHANNEL_SCHEDULER_ACTION_NOTIFY,
//     JSON.stringify({ ...config, projectId })
//   )
// }
//
// const createCronjob = (cronId: string, data: Scheduler) => {
//   const trigger = data.trigger as TTrigger
//   const projectId = data.projectId
//
//   const { group, config } = data.action as {
//     group: string
//     config: TActionNotifyConfig
//   }
//
//   const pattern = generateCronPattern(trigger)
//
//   // Create cron job
//   // const task = cron.schedule('*/10 * * * * *', () => {
//   const task = cron.schedule(pattern, () => {
//     if (group === 'notification') {
//       actionNotification(projectId, config)
//     }
//   })
//
//   task.start()
//
//   console.log('registered cron job', cronId)
//   cronList.set(cronId, task)
// }
//
// connectSubClient((err, redis) => {
//   if (err) return
//
//   fetchNRunAllScheduler()
//
//   // 1. first, register the channel
//   redis.subscribe(CHANNEL_SCHEDULER_CREATE, (err, count) => {
//     if (err) {
//       console.error('Failed to subscribe: %s', err.message)
//       return
//     }
//
//     console.log(
//       `Subscribed successfully ! This client is currently subscribed to ${count} channels`
//     )
//   })
//
//   redis.subscribe(EVENT.SCHEDULER_DELETE, (err, count) => {
//     console.log(err, count)
//   })
//
//   // 2. Now, watch message
//   redis.on('message', (channel, message) => {
//     if (channel === CHANNEL_SCHEDULER_CREATE) {
//       try {
//         const data = JSON.parse(message) as Scheduler
//
//         const cronId = randomUUID()
//         createCronjob(cronId, data)
//         scheduleRepo.updateCronId(data.id, cronId)
//       } catch (error) {
//         console.log(error)
//       }
//     }
//
//     if (channel === EVENT.SCHEDULER_DELETE) {
//       try {
//         const id = JSON.parse(message)
//         if (cronList.has(id)) {
//           const task = cronList.get(id)
//           task.stop()
//           cronList.delete(id)
//         } else {
//           console.log(`cron id: ${id} does not exist`)
//         }
//       } catch (error) {
//         console.log(error)
//       }
//     }
//   })
// })

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
