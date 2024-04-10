import { TaskChecklistRepository } from "@shared/models";
import { BaseController, UseMiddleware, Controller, Get, Post, Req, Delete, Put, Body, Param } from "../../core";
import { AuthRequest } from "../../types";
import { authMiddleware, beProjectMemberMiddleware } from "../../middlewares";
import BadRequestException from "../../exceptions/BadRequestException";
import { TaskChecklist } from "@prisma/client";

@Controller('/project/task/checklist')
@UseMiddleware([authMiddleware, beProjectMemberMiddleware])
export default class TaskChecklistController extends BaseController {
  private checklistRepo: TaskChecklistRepository

  constructor() {
    super()
    this.checklistRepo = new TaskChecklistRepository()
  }
  @Get('/:taskId')
  async getChecklistByTaskId(@Param() params: { taskId: string }) {

    const { taskId } = params

    const results = await this.checklistRepo.getAllByTaskId(taskId)

    return results

  }

  @Put('')
  async updateChecklist(@Body() body: TaskChecklist) {
    const { title, done, order, id } = body

    console.log('update checklist:', body)
    if (!id) {
      throw new BadRequestException()
    }

    const checklistData = await this.checklistRepo.getById(id)
    let changed = false

    if (title !== checklistData.title) {
      checklistData.title = title
      changed = true
    }

    if (done !== checklistData.done) {
      checklistData.done = done
      changed = true
    }

    if (order !== checklistData.order) {
      checklistData.order = order

      if (order) {
        checklistData.doneAt = new Date()
      }

      changed = true
    }

    if (changed) {
      const { id, ...restData } = checklistData
      await this.checklistRepo.updateById(id, restData)
      return 1
    }

    return 0
  }

  @Post('')
  async createChecklist(@Body() body: TaskChecklist) {

    const { title, order, taskId } = body

    const result = await this.checklistRepo.create({
      title,
      order: 1,
      taskId,
      done: false,
      doneAt: null
    })

    return result
  }

  @Delete('/:checklistId')
  async deleteChecklist(@Param() params: { checklistId: string }) {
    const { checklistId } = params

    if (!checklistId) {
      throw new BadRequestException()
    }


    const result = await this.checklistRepo.deleteById(checklistId)

    console.log(result)

    return result
  }
}
