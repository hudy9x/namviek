import { TaskRepository } from "@shared/models";
import { BaseController, Body, Controller, Post } from "../../core";
import { CKEY, findNDelCaches } from "../../lib/redis";

interface IReorderData {
  sourceId: string
  destinationId: string
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
    const { sourceId, destinationId, projectId } = body

    const result = await this.taskRepo.reorder({
      sourceId: parseInt(sourceId, 10),
      destinationId: parseInt(destinationId, 10),
      projectId
    })

    const key = [CKEY.TASK_QUERY, projectId]
    await findNDelCaches(key)

    console.log('result 13')
    console.log(result)

    return 1
  }
}

