import { SchedulerRepository } from '@shared/models'
import { BaseController, Body, Controller, Get, Post } from '../../core'

interface IObject {
  [key: string]: unknown
}

interface IScheduler {
  organizationId: string,
  projectId: string,
  trigger: {
    every: 'day' | 'weekday' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun'
    at: { hour: number, minute: number, period: 'am' | 'pm' }
  },
  action: {
    group: string,
    config: IObject
  }
}


@Controller('/scheduler')
export class SchedulerController extends BaseController {
  scheduleRepo: SchedulerRepository
  constructor() {
    super()
    this.scheduleRepo = new SchedulerRepository()
  }
  @Post('')
  async createScheduler(@Body() body: IScheduler) {
    const repo = this.scheduleRepo
    const { organizationId, projectId, trigger, action } = body
    const { group, config } = action

    const title = config.title as string
    const content = config.content as string

    console.log(body)

    const result = await repo.create({
      organizationId,
      projectId,
      trigger,
      action: {
        group,
        config: {
          title: title,
          content: content
        }
      },

      createdAt: new Date(),
      createdBy: '1',
      updatedAt: null,
      updatedBy: null
    })

    console.log(result)
    return result
    // console.log(1)
  }

  @Get('')
  async getSchedulers() {
    return 1
  }
}
