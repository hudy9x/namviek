
import StatsUnDoneTaskService from '../../services/stats/undone.tasks.service'
import { BaseJob } from '../BaseJob'


export class UnDoneTasksByProjectJob extends BaseJob {
  name = 'unDoneTasksByProject'
  service: StatsUnDoneTaskService
  constructor() {
    super()
    this.service = new StatsUnDoneTaskService()
  }
  async implement(projectId: string) {
    await this.service.implement(projectId)
  }
}
