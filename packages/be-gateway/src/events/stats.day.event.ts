import { StatsQueue, getStatsQueueInstance } from "../queues/Stats";
import ProjectService from "../services/project/index.service";

export default class StatsByDayEvent {
  projectService: ProjectService
  statsQueue: StatsQueue
  constructor() {
    this.projectService = new ProjectService()
    this.statsQueue = getStatsQueueInstance()
  }
  async run() {
    const projectIds = await this.projectService.getAllProjectIds()

    projectIds.map(pid => {
      console.log('call pid', pid)
      this.statsQueue.addJob('doneTasksByMember', pid)
    })
  }
}
