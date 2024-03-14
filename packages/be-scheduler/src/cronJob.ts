import cron, { ScheduledTask } from 'node-cron'
import { randomUUID } from 'crypto'

export type TTrigger = {
  every:
  | 'minute'
  | 'hour'
  | 'day'
  | 'weekday'
  | 'mon'
  | 'tue'
  | 'wed'
  | 'thu'
  | 'fri'
  | 'sat'
  | 'sun'
  at?: { hour: number; minute: number; period: 'am' | 'pm' }
}

const cronList = new Map<string, ScheduledTask>()

const generateCronPattern = (trigger: TTrigger) => {
  const { every, at } = trigger
  const { hour, minute, period } = at || { hour: 1, minute: 1, period: 'am' }

  let time: string[] = []

  if (every === 'minute') return '* * * * *'
  if (every === 'hour') return '0 * * * *'

  if (hour && minute && period) {
    time.push(minute + '')
    time.push(hour + (period === 'pm' ? 12 : 0) + '')
  } else {
    time.push('*') // minute
    time.push('*') // hour
  }

  switch (every) {
    case 'day':
      time = [...time, ...['*', '*', '*']]
      break

    case 'weekday':
      time = [...time, ...['*', '*', '1-5']]
      break

    case 'mon':
    case 'tue':
    case 'wed':
    case 'thu':
    case 'fri':
    case 'sat':
    case 'sun':
      time = [...time, ...['*', '*', every]]
      break

    default:
      time = ['*', '*', '*']
      break
  }

  return time.join(' ')
}

export const cronJob = {
  randId: () => randomUUID(),
  delete: (id: string) => {
    try {
      if (cronList.has(id)) {
        const task = cronList.get(id)
        task.stop()
        cronList.delete(id)
        console.log(`cron ${id} has been deleted`)
      } else {
        console.log(`cron id: ${id} does not exist`)
      }
    } catch (error) {
      console.log('delete error', error)
    }
  },
  create: (cronId: string, trigger: TTrigger, cb: () => void) => {
    const pattern = generateCronPattern(trigger)

    const task = cron.schedule(pattern, () => {
      // const task = cron.schedule('*/10 * * * * *', () => {
      cb()
    })

    task.start()

    console.log('registered cron job', cronId)
    cronList.set(cronId, task)
  }
}
