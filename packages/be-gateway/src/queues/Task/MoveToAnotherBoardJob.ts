import { TaskReorderService } from '../../services/task/order.service'
import { BaseJob } from '../BaseJob'

interface IReorderData {
  updatedOrder: [string, string][]
  projectId: string
}

export class MoveToAnotherBoardJob extends BaseJob {
  name = 'moveToOtherBoard'
  reorderService: TaskReorderService
  constructor() {
    super()
    this.reorderService = new TaskReorderService()
  }
  async implement(data: IReorderData) {
    console.log(1)
    this.reorderService.implement(data)
  }
}
