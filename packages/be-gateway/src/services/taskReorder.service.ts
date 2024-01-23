import { TaskRepository } from '@shared/models'
import { CKEY, findNDelCaches } from '../lib/redis'

interface IReorderData {
  updatedOrder: [string, string][]
  projectId: string
}

export class TaskReorderService {
  taskRepo: TaskRepository
  constructor() {
    this.taskRepo = new TaskRepository()
  }

  async implement(data: IReorderData) {
    const { updatedOrder, projectId } = data

    if (!updatedOrder.length) {
      return null
    }

    console.log('updateorder', updatedOrder)
    const result = await this.taskRepo.reorder({
      updatedOrder
    })

    const key = [CKEY.TASK_QUERY, projectId]
    await findNDelCaches(key)

    return result
  }
}
