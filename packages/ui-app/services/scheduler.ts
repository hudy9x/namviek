import { ISchedulerTrigger } from "@/features/AutomationScheduler/context"
import { httpPost } from "./_req"

interface IObject {
  [key: string]: unknown
}

interface IScheduler {
  organizationId: string,
  projectId: string,
  trigger: ISchedulerTrigger,
  action: {
    group: string,
    config: IObject
  }
}

export const schedulerService = {
  create: (data: IScheduler) => {
    return httpPost('/api/scheduler', data)
  }
}
