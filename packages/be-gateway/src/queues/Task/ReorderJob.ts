import { TaskReorderService } from '../../services/task/order.service'
import { BaseJob } from '../BaseJob'

interface IReorderData {
  updatedOrder: [string, string][]
  projectId: string
}

export class ReorderJob extends BaseJob {
  name = 'reorder'
  reorderService: TaskReorderService
  constructor() {
    super()
    this.reorderService = new TaskReorderService()
  }
  async implement(data: IReorderData) {
    await this.reorderService.implement(data)
  }
}
