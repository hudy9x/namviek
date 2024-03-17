import { Task } from '@prisma/client'
import { notifyToWebUsers } from '../lib/buzzer'
import { findCache, getJSONCache } from '../lib/redis'
import { extracDatetime, padZero } from '@shared/libs'
import { sendEmail } from '../lib/email'

type RemindPayload = {
  message: string
  link: string
  receivers: string[]
}

export class ReminderEvent {
  async run() {
    const now = new Date()
    const { y, m, d, hour, min } = extracDatetime(now)

    const key = [
      `remind-${y}${padZero(m)}${padZero(d)}-${padZero(hour)}:${padZero(min)}`
    ]
    console.log('remnider.event called', new Date())

    const results = await findCache(key)

    if (!results.length) return

    results.forEach(async k => {
      const data = await getJSONCache([k])
      if (!data) return

      const { receivers, message, link } = data as RemindPayload
      if (!receivers || !receivers.length) return

      console.log('assigneeIds', receivers)
      notifyToWebUsers(receivers, {
        title: 'Reminder ⏰',
        body: message,
        deep_link: link
      })

      // sendEmail({
      //   emails,
      //   subject,
      //   html,
      // })
    })
  }
}
