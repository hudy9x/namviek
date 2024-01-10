import { connectSubClient, onPubsubMessage, subscribe } from "@shared/pubsub";
import { Scheduler } from "@prisma/client";
import { SchedulerRepository } from "@shared/models";
import cron from "node-cron";
import { randomUUID } from "crypto";

const cronList = new Map()

const scheduleRepo = new SchedulerRepository()

connectSubClient((err, redis) => {
  if (err) return

  const CHANNEL_NAME = 'scheduler:create'
  // 1. first, register the channel
  redis.subscribe(CHANNEL_NAME, (err, count) => {
    if (err) {
      console.error('Failed to subscribe: %s', err.message)
      return
    }

    console.log(`Subscribed successfully ! This client is currently subscribed to ${count} channels`)
  })


  // 2. Now, watch message
  redis.on('message', (channel, message) => {
    if (channel === CHANNEL_NAME) {
      console.log('message send to: %s', channel)
      try {
        const data = JSON.parse(message) as Scheduler
        const trigger = data.trigger as {
          every: 'day' | 'weekday' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
          at: { hour: number, minute: number, period: 'am' | 'pm' }
        }

        const { group, config } = data.action as {
          group: string, config: {
            [key: string]: unknown
          }
        }

        console.log(trigger, group, config)

        const cronId = randomUUID()
        const task = cron.schedule('* * * * *', () => {
          console.log('will execute every minute until stopped');
        })

        console.log('start cron job')
        console.log(cronId, typeof cronId)

        task.start()

        cronList.set(cronId, task)
        scheduleRepo.updateCronId(data.id, cronId).then(res => {
          console.log('updated cron id', res)
        })



      } catch (error) {
        console.log(error)
      }
    }
  })

})

// subscribe('scheduler-create', (err, data) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(data)
// })
//
// onPubsubMessage('scheduler-create', (err, data) => {
//   console.log('12039810298309')
//   console.log(err, data)
//
// })
// console.log('Hello World')
