import { SchedulerRepository } from '@shared/models'
import { BaseController, Body, Controller, Get, Post } from '../../core'

@Controller('/scheduler')
export class SchedulerController extends BaseController {
  scheduleRepo: SchedulerRepository
  constructor() {
    super()
    this.scheduleRepo = new SchedulerRepository()
  }
  @Post('')
  async createScheduler(@Body() body) {
    console.log(1)
  }

  @Get('')
  async getSchedulers() {
    return 1
  }
}
