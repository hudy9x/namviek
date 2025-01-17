import { Prisma, PrismaPromise, Task } from '@prisma/client'
import { pmClient } from './_prisma'

interface IReorderData {
  updatedOrder: [string, string][]
}


export class TaskRepository {

  async reorder({ updatedOrder }: IReorderData) {

    const updatePromises: Prisma.PrismaPromise<Task>[] = []

    updatedOrder.forEach(t => {
      const [id, order] = t
      updatePromises.push(pmClient.task.update({
        where: {
          id
        },
        data: {
          order: parseInt(order, 10)
        }
      }))
    })

    const results = await pmClient.$transaction(updatePromises)

    return { results }

  }
}
