import {
  BaseController,
  Body,
  Controller,
  Post,
} from '../../core'

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


    return { projectId }
  }

}

