import { BaseController, UseMiddleware, Controller, Get, Post, Req, Delete, Put, Body, Param } from "../../core";
import { authMiddleware, beProjectMemberMiddleware } from "../../middlewares";
import { TaskChecklist } from "@prisma/client";
import TaskChecklistService from "../../services/task/checklist.service";

@Controller('/project/task/checklist')
@UseMiddleware([authMiddleware, beProjectMemberMiddleware])
export default class TaskChecklistController extends BaseController {
  private checklistService: TaskChecklistService

  constructor() {
    super()
    this.checklistService = new TaskChecklistService()
  }
  @Get('/:taskId')
  async getChecklistByTaskId(@Param() params: { taskId: string }) {
    console.log(1)
    const { taskId } = params
    const results = await this.checklistService.get(taskId)
    return results
  }

  @Put('')
  async updateChecklist(@Body() body: TaskChecklist) {
    const ret = await this.checklistService.update(body)
    return ret
  }

  @Post('')
  async createChecklist(@Body() body: TaskChecklist) {
    const result = await this.checklistService.create(body)
    return result
  }

  @Delete('/:checklistId')
  async deleteChecklist(@Param() params: { checklistId: string }) {
    const result = await this.checklistService.delete(params.checklistId)
    return result
  }
}
