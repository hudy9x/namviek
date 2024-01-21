import { TaskRepository } from "@shared/models";
import { BaseController, Body, Controller, Post } from "../../core";
import { CKEY, findNDelCaches } from "../../lib/redis";

interface IReorderData {
  updatedOrder: [string, string][]
  projectId: string
}

@Controller('/task/reorder')
export default class TaskReorderController extends BaseController {

  taskRepo: TaskRepository
  constructor() {
    super()
    this.taskRepo = new TaskRepository()
  }

  @Post('')
  async reorder(@Body() body: IReorderData) {
    const { updatedOrder, projectId } = body

    if (!updatedOrder.length) {
      return null
    }

    console.log('updateorder', updatedOrder)
    const result = await this.taskRepo.reorder({
      updatedOrder
    })

    const key = [CKEY.TASK_QUERY, projectId]
    await findNDelCaches(key)

    console.log('result 15')


    return result
  }
}

