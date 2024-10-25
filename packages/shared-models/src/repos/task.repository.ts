// import { Prisma, PrismaPromise, Task } from '@prisma/client'
// import { pmClient } from './_prisma'
import mongoose, { ClientSession } from "mongoose";
import { taskModel, ITaskField } from "../schema";

interface IReorderData {
  updatedOrder: [string, string][]
}

export class TaskRepository {

  async reorder({ updatedOrder }: IReorderData) {

    const session = await mongoose.startSession()
    const results = await session.withTransaction(async (ses: ClientSession) => {

      const updatePromises: Promise<ITaskField>[] = []

      updatedOrder.forEach(t => {
        const [id, order] = t
        updatePromises.push(
          taskModel.findByIdAndUpdate(id, {
            order: parseInt(order, 10)
          }).session(ses)
        )
      })

      const res = await Promise.all(updatePromises)
      return res
    })

    await session.endSession()

    return { results }

  }
}
