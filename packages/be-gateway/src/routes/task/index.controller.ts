import { mdTaskGetAll } from "@shared/models";
import { BaseController, UseMiddleware, Controller, Get, Post, Req, Delete, Put, Body } from "../../core";
import { AuthRequest } from "../../types";
import { getTodoCounter, updateTodoCounter } from "../../services/todo.counter";
import { authMiddleware, beProjectMemberMiddleware } from "../../middlewares";

@Controller('/project/task')
@UseMiddleware([authMiddleware, beProjectMemberMiddleware])
export default class TaskController extends BaseController {
  @Get('/checklist')
  async getChecklistByTaskId() {
    return 1
  }

  @Put('/checklist')
  async updateChecklist() {
    return 1
  }

  @Post('/checklist')
  async createChecklist(@Body() body, @Req() req: AuthRequest) {


    console.log(body)


    return 1
  }

  @Delete('/checklist')
  async deleteChecklist() {
    return 1
  }
}
