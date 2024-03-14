import { notifyToWebUsers } from '../lib/buzzer'
import { findCache, getJSONCache } from '../lib/redis'
import { extracDatetime, padZero } from '@shared/libs'
export class ReminderEvent {
  async run() {
    const { y, m, d, hour, min } = extracDatetime(new Date())

    const key = [
      `remind-${y}-${padZero(m)}-${padZero(d)}-${padZero(hour)}:${padZero(min)}`
    ]

    const results = await findCache(key)

    console.log('keys list', results)
    if (!results.length) return

    results.forEach(async k => {
      const res = await getJSONCache([k])
      console.log(res)
    })
  }
}
