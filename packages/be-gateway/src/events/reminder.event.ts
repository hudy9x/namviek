import { Task } from '@prisma/client'
import { notifyToWebUsers } from '../lib/buzzer'
import { findCache, getJSONCache } from '../lib/redis'
import { extracDatetime, padZero } from '@shared/libs'
export class ReminderEvent {
  async run() {
    const now = new Date()
    const { y, m, d, hour, min } = extracDatetime(now)

    console.log('remnider.event called', new Date())
    const key = [
      `remind-${y}-${padZero(m)}-${padZero(d)}-${padZero(hour)}:${padZero(min)}`
    ]

    const results = await findCache(key)

    if (!results.length) return

    results.forEach(async k => {
      const data = await getJSONCache([k])
      if (!data) return

      const { assigneeIds, title, dueDate } = data as Task
      if (!assigneeIds || !assigneeIds.length) return

      notifyToWebUsers(assigneeIds, {
        title: 'Reminder ⏰',
        body: "It's 15m to your meeting"
      })
    })
  }
}
