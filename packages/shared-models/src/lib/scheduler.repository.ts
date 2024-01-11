import { Scheduler } from '@prisma/client'
import { pmClient } from './_prisma'

const mdScheduler = pmClient.scheduler
export class SchedulerRepository {
  async findAll() {
    return mdScheduler.findMany({})
  }

  async delete(id: string) {
    return mdScheduler.delete({
      where: {
        id
      }
    })
  }

  async findAllByProjectId(projectId: string) {
    return mdScheduler.findMany({
      where: {
        projectId
      }
    })
  }

  async updateCronId(id: string, cronId: string) {
    return mdScheduler.update({
      where: {
        id
      },
      data: {
        cronId
      }
    })
  }

  async create(data: Omit<Scheduler, 'id'>) {
    return mdScheduler.create({
      data
    })
  }
}
