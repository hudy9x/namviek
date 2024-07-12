import { pmClient } from 'packages/shared-models/src/lib/_prisma'
import {
  BaseController,
  Body,
  Controller,
  Get,
  Post,
} from '../../core'
import { mdTaskGetAll } from '@shared/models'

@Controller('/test-perf')
export class LoadTestController extends BaseController {
  constructor() {
    super()

  }

  @Post('/load-test')
  async doLoadTest(@Body() body: { projectId: string, assigneeIds: string[] }) {
    const { projectId, assigneeIds } = body

    // console.log('-----------------')
    // console.log(projectId, assigneeIds)

    const result = await mdTaskGetAll({
      projectId: projectId,
      dueDate: ['2024-06-01', '2024-06-30'],
      assigneeIds
    })

    return result
  }

}

