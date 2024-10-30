import { FieldType } from "@prisma/client";
import { BaseController, UseMiddleware, Controller, Put, Body } from "../../core";
import { authMiddleware, beProjectMemberMiddleware } from "../../middlewares";
import TaskCustomFieldService from "../../services/task/custom.field.service";

@Controller('/project/task/custom-field')
@UseMiddleware([authMiddleware, beProjectMemberMiddleware])
export default class TaskCustomFieldController extends BaseController {
  private customFieldService: TaskCustomFieldService

  constructor() {
    super()
    this.customFieldService = new TaskCustomFieldService()
  }

  @Put('')
  async update(@Body() body: { value: string, taskId: string, fieldId: string, type: FieldType }) {
    console.log('body 7')
    const ret = await this.customFieldService.update(body)
    return ret
  }


  // @Delete('/:checklistId')
  // async deleteChecklist(@Param() params: { checklistId: string }) {
  //   const result = await this.checklistService.delete(params.checklistId)
  //   return result
  // }
}
