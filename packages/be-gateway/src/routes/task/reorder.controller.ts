import { BaseController, Body, Controller, Post } from '../../core'
import { TaskQueue, getTaskQueueInstance } from '../../queues'

interface IReorderData {
  updatedOrder: [string, string][]
  projectId: string
}

@Controller('/task/reorder')
export default class TaskReorderController extends BaseController {
  taskQueue: TaskQueue
  constructor() {
    super()

    this.taskQueue = getTaskQueueInstance()
  }

  @Post('')
  async reorder(@Body() body: IReorderData) {
    console.log('add reorder job')
    await this.taskQueue.addJob('reorder', body)

    return 1

    // return result
  }
}
