import { Scheduler } from '@prisma/client'
import { pmClient } from './_prisma'

const mdTask = pmClient.task

interface IReorderData {
  sourceId: number
  destinationId: number
  projectId: string
}

export class TaskRepository {

  async reorder({ sourceId, destinationId, projectId }: IReorderData) {
    const direction = sourceId > destinationId ? "up" : "down"
    const [min, max] = sourceId > destinationId ? [destinationId, sourceId] : [sourceId, destinationId]
    const isMovedUp = direction === 'up'

    // get all task inside the source index and the destination index
    const tasks = await mdTask.findMany({
      where: {
        projectId,
        order: {
          gte: min,
          lte: max
        }
      },
      orderBy: {
        order: 'asc'
      },
      select: {
        id: true,
        order: true
      }
    })

    const len = tasks.length

    // can not move if only 1 item returned
    if (len <= 1) {
      return 1
    }

    // if only 2 items returned
    // just swap the order
    if (len === 2) {
      console.log('only 2 items')
      await pmClient.$transaction(async tx => {
        console.log('1')
        const [firstTask, lastTask] = tasks

        await tx.task.update({
          where: {
            id: firstTask.id
          },
          data: {
            order: lastTask.order
          }
        })

        await tx.task.update({
          where: {
            id: lastTask.id
          },
          data: {
            order: firstTask.order
          }
        })
      })

      return 'update 2 item success'
    }

    await pmClient.$transaction(async tx => {

      const updatePromises = []
      const updateTheMovedItem = (id) => {
        updatePromises.push(tx.task.update({
          where: {
            id
          },
          data: {
            order: destinationId
          }
        }))
      }

      const updateTaskOrder = (id: string, order: number) => {
        updatePromises.push(tx.task.update({
          where: {
            id
          },
          data: {
            order
          }
        }))

      }

      // 1. when use move task up to 
      if (isMovedUp) {
        console.log('up')
        console.log('tasks', tasks)
        const lastTask = tasks[len - 1]

        // update it's order to the destination's order
        updateTheMovedItem(lastTask.id)

        console.log('start reorder')

        console.log('------')
        console.log(lastTask.id)
        console.log(lastTask.order)
        console.log(destinationId)

        for (let i = 0; i < tasks.length - 1; i++) {
          const task = tasks[i];
          const nextTask = tasks[i + 1]
          if (!nextTask) continue

          console.log('------')
          console.log(task.id)
          console.log(task.order)
          console.log(nextTask.order)

          updateTaskOrder(task.id, nextTask.order)

        }

        // 2. when user move item down
      } else {
        console.log('down')
        const firstTask = tasks[0]

        updateTheMovedItem(firstTask.id)

        console.log('start reorder')
        // update it's order to the destination's order
        // updatePromises.push(tx.task.update({
        //   where: {
        //     id: firstTask.id
        //   },
        //   data: {
        //     order: destinationId
        //   }
        // }))

        console.log('------')
        console.log(firstTask.id)
        console.log(firstTask.order)
        console.log(destinationId)

        for (let i = 1; i < tasks.length; i++) {
          const task = tasks[i];
          const prevTask = tasks[i - 1]
          if (!prevTask) continue

          console.log('------')
          console.log(task.id)
          console.log(task.order)
          console.log(prevTask.order)

          updateTaskOrder(task.id, prevTask.order)
        }
      }

      await Promise.all(updatePromises)
    })

    return 'update many item order success'


  }
}
