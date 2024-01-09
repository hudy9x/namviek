import { Scheduler } from '@prisma/client'
import { pmClient } from './_prisma'

const mdScheduler = pmClient.scheduler
export class SchedulerRepository {
  async findAll() {
    return mdScheduler.findMany({})
  }

  async create(data: Omit<Scheduler, 'id'>) {
    return mdScheduler.create({
      data
    })
  }


}
