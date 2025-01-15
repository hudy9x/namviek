import { SchedulerRepository } from '@shared/models'
import {
  BaseController,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '../../core'
import { publish } from '@shared/pubsub'
import { CHANNEL_SCHEDULER_CREATE, EVENT } from '../../events'

interface IObject {
  [key: string]: unknown
}

interface IScheduler {
  organizationId: string
  projectId: string
  trigger: {
    every:
    | 'day'
    | 'weekday'
    | 'mon'
    | 'tue'
    | 'wed'
    | 'thu'
    | 'fri'
    | 'sat'
    | 'sun'
    at: { hour: number; minute: number; period: 'am' | 'pm' }
  }
  action: {
    group: string
    config: IObject
    to: string[]
  }
}

@Controller('/scheduler')
export class SchedulerController extends BaseController {
  scheduleRepo: SchedulerRepository
  constructor() {
    super()
    this.scheduleRepo = new SchedulerRepository()
  }
  @Get('/:projectId')
  async getSchedulerByProjectId(@Param() params: { projectId: string }) {
    const { projectId } = params

    const schedulers = await this.scheduleRepo.findAllByProjectId(projectId)
    return schedulers
  }

  @Delete('/:schedulerId')
  async deleteScheduler(@Param() params: { schedulerId: string }) {
    const { schedulerId } = params
    console.log('aaaaa', schedulerId)

    const deleted = await this.scheduleRepo.delete(schedulerId)

    publish(EVENT.SCHEDULER_DELETE, deleted.cronId)

    console.log(1)
    return deleted
  }

  @Post('')
  async createScheduler(@Body() body: IScheduler) {
    const repo = this.scheduleRepo
    const { organizationId, projectId, trigger, action } = body
    const { group, config } = action

    const title = config.title as string
    const content = config.content as string
    const to = config.to as string[]

    const result = await repo.create({
      organizationId,
      projectId,
      trigger,
      cronId: null,
      action: {
        group,
        config: {
          title: title,
          content: content,
          to
        }
      },

      createdAt: new Date(),
      createdBy: '1',
      updatedAt: null,
      updatedBy: null
    })

    publish(CHANNEL_SCHEDULER_CREATE, result)

    return result
  }

  @Get('')
  async getSchedulers() {
    return 1
  }
}
