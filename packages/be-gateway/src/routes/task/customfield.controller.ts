import { FieldType } from "@prisma/client";
import { BaseController, UseMiddleware, Controller, Put, Post, Body } from "../../core";
import { authMiddleware, beProjectMemberMiddleware } from "../../middlewares";
import TaskCustomFieldService, { IFilterAdvancedData } from "../../services/task/custom.field.service";


@Controller('/project/task/custom-field')
@UseMiddleware([authMiddleware, beProjectMemberMiddleware])
export default class TaskCustomFieldController extends BaseController {
  private customFieldService: TaskCustomFieldService

  constructor() {
    super()
    this.customFieldService = new TaskCustomFieldService()
  }

  @Put('')
  async update(@Body() body: { value: string | string[], taskId: string, fieldId: string, type: FieldType }) {
    console.log('body 1', body)
    const ret = await this.customFieldService.update(body)
    return ret
  }

  @Post('/query')
  async queryCustomField(@Body() body: { projectId: string, filter: IFilterAdvancedData }) {
    try {
      console.log('1')
      const { filter, projectId } = body
      const result = await this.customFieldService.queryCustomField(projectId, filter)
      return result
    } catch (error) {
      console.error('Custom query error:', error)
      return { status: 500, error: error.message }
    }
  }
}
