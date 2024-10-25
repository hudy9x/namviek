// import { Scheduler } from '@prisma/client'
// import { pmClient } from './_prisma'
import { schedulerModel as mdScheduler, ISchedulerField } from "../schema";

// const mdScheduler = pmClient.scheduler
export class SchedulerRepository {
  async findAll() {
    return mdScheduler.find({})
  }

  async delete(id: string) {
    return mdScheduler.findByIdAndDelete(id)
  }

  async findAllByProjectId(projectId: string) {
    return mdScheduler.find({
      projectId
    })
  }

  async updateCronId(id: string, cronId: string) {
    return mdScheduler.findByIdAndUpdate(id, {
      cronId,
      updatedAt: new Date()
    })
  }

  async create(data: Omit<ISchedulerField, 'id'>) {
    const { organizationId, projectId, cronId, trigger, action, createdAt, createdBy } = data
    return mdScheduler.create({
      organizationId,
      projectId,
      cronId,
      trigger: trigger ? trigger : {},
      action: action ? action : {},
      createdAt,
      createdBy,
      updatedAt: null,
      updatedBy: null
    })
  }
}
