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
        cronId,
        updatedAt: new Date()
      }
    })
  }

  async create(data: Omit<Scheduler, 'id'>) {
    const { organizationId, projectId, cronId, trigger, action, createdAt, createdBy } = data
    return mdScheduler.create({
      data: {
        organizationId,
        projectId,
        cronId,
        trigger: trigger ? trigger : {},
        action: action ? action : {},
        createdAt,
        createdBy,
        updatedAt: null,
        updatedBy: null
      }
    })
  }
}
