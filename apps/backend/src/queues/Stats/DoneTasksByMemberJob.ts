
import StatsDoneTaskService from '../../services/stats/done.tasks.service'
import { BaseJob } from '../BaseJob'


export class DoneTasksByMemberJob extends BaseJob {
  name = 'doneTasksByMember'
  service: StatsDoneTaskService
  constructor() {
    super()
    this.service = new StatsDoneTaskService()
  }
  async implement(projectId: string) {
    await this.service.implement(projectId)
  }
}
