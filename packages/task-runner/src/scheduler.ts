import { Redis } from 'ioredis'
import { Scheduler } from '@prisma/client'
import { TTrigger, cronJob } from './cronJob'
import { BaseAction } from './actions/BaseAction'
import { SchedulerRepository } from '@shared/models'

export const EVENT = {
  SCHEDULER_DELETE: 'scheduler:delete',
  SCHEDULER_CREATE: 'scheduler:create'
}

export class SchedulerAction {
  rd: Redis
  repo: SchedulerRepository
  constructor(redis: Redis) {
    this.rd = redis
    this.repo = new SchedulerRepository()
  }

  events: BaseAction[] = []
  register(scheduleAction: BaseAction) {
    this.events.push(scheduleAction)
  }

  eventDelete(message: string) {
    try {
      const id = JSON.parse(message)
      cronJob.delete(id)
    } catch (error) {
      console.log('delete cron error:', error)
    }
  }

  createCron(cronId: string, data: Scheduler) {
    const events = this.events
    const trigger = data.trigger as TTrigger

    const { group } = data.action as {
      group: string
    }

    // create cronjob with an id
    cronJob.create(cronId, trigger, () => {
      // find matched action
      for (let i = 0; i < events.length; i++) {
        const event = events[i]
        if (event.type === group) {
          // run matched action and break the loop
          event.run(data)
          break
        }
      }
    })
  }

  fetchNRunAllScheduler() {
    this.repo.findAll().then(res => {
      res.forEach(result => {
        const cronId = result.cronId
        if (cronId) {
          this.createCron(cronId, result)
        }
      })
    })
  }

  listenMessage() {
    const rd = this.rd
    const repo = this.repo

    // after subscribing channels, now we can listen from them
    rd.on('message', (channel, message) => {
      if (channel === EVENT.SCHEDULER_CREATE) {
        const data = JSON.parse(message) as Scheduler
        const cronId = cronJob.randId()

        // create cronjob with an id
        console.log('cronid', cronId)
        this.createCron(cronId, data)
        repo.updateCronId(data.id, cronId)
        console.log('new cronjob has been created', cronId)
      }

      // for delete cron event
      if (channel === EVENT.SCHEDULER_DELETE) {
        this.eventDelete(message)
      }
    })
  }

  subscribeChannel() {
    const rd = this.rd

    // just subscribe channel by name, and do nothing
    rd.subscribe(EVENT.SCHEDULER_DELETE)
    rd.subscribe(EVENT.SCHEDULER_CREATE, (err, count) => {
      if (err) {
        console.log('subscribe')
        return
      }
    })
  }

  run() {
    // get all scheduler from databases
    this.fetchNRunAllScheduler()
    // create channels first
    this.subscribeChannel()
    // after create channels, now we can listen from them
    // note: you must create channels first then listeners must work
    this.listenMessage()
  }
}
