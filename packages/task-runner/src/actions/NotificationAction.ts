import { publish } from '@shared/pubsub'
import { BaseAction } from './BaseAction'
import { Scheduler } from '@prisma/client'

type TActionNotifyConfig = {
  [key: string]: unknown
}

const CHANNEL_SCHEDULER_ACTION_NOTIFY = 'scheduler:action-notify'
export class NotificationAction extends BaseAction {
  type = 'notification'
  run(data: Scheduler): void {
    const { projectId } = data
    const { config } = data.action as {
      config: TActionNotifyConfig
    }

    publish(CHANNEL_SCHEDULER_ACTION_NOTIFY, { ...config, projectId })
  }
}
