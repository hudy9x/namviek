import { Scheduler } from '@prisma/client'

export abstract class BaseAction {
  type: string

  abstract run(data: Scheduler): void
}
