import { pmClient } from 'packages/shared-models/src/lib/_prisma'
import {
  BaseController,
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
  async doLoadTest() {

    mdTaskGetAll({
      projectId: "",
      dueDate: ['2024-06-01', '2024-06-30']
    })

    return 1
  }

}

