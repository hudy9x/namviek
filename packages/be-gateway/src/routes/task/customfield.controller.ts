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

  @Put('/update-many')
  async updateMany(@Body() body: {
    taskIds: string[],
    data: {
      [fieldId: string]: { value: string, type: FieldType }
    }
  }) {

    console.log('Update multi field called')
    const ret = await this.customFieldService.updateMany(body.taskIds, body.data)

    return ret

  }

  @Post('/query')
  async queryCustomField(@Body() body: {
    projectId: string,
    filter: IFilterAdvancedData,
    options: {
      cursor?: string
      limit?: number
      orderBy?: { [key: string]: 'asc' | 'desc' }
    }
  }) {
    try {
      const { filter, projectId, options } = body
      const result = await this.customFieldService.queryCustomField(projectId, filter, {
        limit: options ? options.limit : 50,
        cursor: options ? options.cursor : ''
      })
      return result
    } catch (error) {
      console.error('Custom query error:', error)
      return { status: 500, error: error.message }
    }
  }
}
