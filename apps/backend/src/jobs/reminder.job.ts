import { extracDatetime, padZero } from '@shared/libs'
import { mdProjectGet } from '@shared/models'
import { genFrontendUrl } from '../lib/url'
import {
  delCache,
  findCache,
  findCacheByTerm,
  setJSONCache
} from '../lib/redis'

type TaskReminderParams = {
  remindAt: Date
  remindBefore?: number
  taskId?: string
  projectId?: string
  title?: string
  link?: string
  message: string
  receivers: string[]
}

export default class TaskReminderJob {
  private async _createTaskLink(projectId: string, taskId: string) {
    const project = await mdProjectGet(projectId)
    const taskLink = genFrontendUrl(
      `${project.organizationId}/project/${projectId}?mode=task&taskId=${taskId}`
    )

    return taskLink
  }

  private _genKey(date: Date, suffix: string) {
    // create reminder key and save this key to redis
    const { y, m, d, hour, min } = extracDatetime(date)

    // key syntax: remind-ddddmmyy-hh-mm-task-<taskID>
    const key = [
      `remind-${y}${padZero(m)}${padZero(d)}-${padZero(hour)}:${padZero(min)}${
        suffix ? '-task-' + suffix : ''
      }`
    ]

    return key
  }

  private _createExpiredTime(date: Date, expiredMinute: number) {
    const now = new Date()
    const dueTime = (date.getTime() - now.getTime()) / 1000
    const expired = expiredMinute * 60

    // the key will be expired after a specified minute
    return dueTime + expired
  }

  async delete(taskId: string) {
    const key = `remind*task-${taskId}`
    const results = await findCacheByTerm(key)

    if (!results.length) return

    results.forEach(k => {
      delCache([k])
    })
  }

  async create({
    remindAt,
    // beforeAt should be number, it represents minutes
    remindBefore,
    taskId,
    // link,
    projectId,
    message,
    receivers
  }: TaskReminderParams) {
    // clone the dueDate to prevent unneccessary updates
    const d1 = new Date(remindAt)
    const now = new Date()

    // TODO: if user want set an reminder at the exact time, do not substract the dueDate
    if (remindBefore) {
      d1.setMinutes(d1.getMinutes() - remindBefore)
      message = `It's ${remindBefore} minutes to: ${message}`
    } else {
      message = `It's time to: ${message}`
    }

    if (d1 <= now) {
      console.log('Can not create reminder, because remind time less than now')
      return
    }

    // create reminder key and save this key to redis
    const key = this._genKey(d1, taskId)

    // the reminder key should have an expired time
    // so it can delete itself automatically
    // after the reminder run for 5 minutes, it will be expired
    const expired = this._createExpiredTime(d1, 5)
    const link = await this._createTaskLink(projectId, taskId)

    // save the key with expired time and data
    setJSONCache(
      key,
      {
        receivers,
        message: message,
        link
      },
      Math.ceil(expired)
    )
  }

  async findByTime(date: Date) {
    const { y, m, d, hour, min } = extracDatetime(date)

    const key = [
      `remind-${y}${padZero(m)}${padZero(d)}-${padZero(hour)}:${padZero(min)}`
    ]

    const results = await findCache(key)

    return results
  }
}
