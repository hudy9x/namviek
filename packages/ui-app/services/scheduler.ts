import { ISchedulerTrigger } from '@/features/AutomationScheduler/context'
import { httpDel, httpGet, httpPost } from './_req'

interface IObject {
  [key: string]: unknown
}

interface IScheduler {
  organizationId: string
  projectId: string
  trigger: ISchedulerTrigger
  action: {
    group: string
    config: IObject
  }
}

export const schedulerService = {
  create: (data: IScheduler) => {
    return httpPost('/api/scheduler', data)
  },
  delete: (id: string) => {
    return httpDel(`/api/scheduler/${id}`)
  },
  getAll: (projectId: string) => {
    return httpGet(`/api/scheduler/${projectId}`)
  }
}
