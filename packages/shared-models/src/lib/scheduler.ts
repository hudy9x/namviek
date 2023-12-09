import { Scheduler } from '@prisma/client'
import { schedulerModel } from './_prisma'

export const mdScheduler = {
  getByName: (name: string) => {
    return schedulerModel.findFirst({
      where: {
        name
      }
    })
  },
  create: (data: Omit<Scheduler, 'id'>) => {
    return schedulerModel.create({
      data
    })
  }
}
