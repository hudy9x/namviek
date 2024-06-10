import ProjectRepository from "packages/shared-models/src/lib/project.repository";
import { StatsQueue, getStatsQueueInstance } from "../queues/Stats";

export default class StatsByDayEvent {
  projectRepo: ProjectRepository
  statsQueue: StatsQueue
  constructor() {
    this.statsQueue = getStatsQueueInstance()
    this.projectRepo = new ProjectRepository()
  }
  async run() {
    const { projectsWMemberEnabled, projectsWCounterEnabled } = await this.projectRepo.getProjectsWithCountSettingEnabled()

    console.log('stats.day.event called', new Date())
    if (!projectsWCounterEnabled || !projectsWCounterEnabled.length) {
      console.log('No project with project counter enabled')
    }

    projectsWCounterEnabled.map(pid => {
      this.statsQueue.addJob('unDoneTasksByProject', pid)
    })

    if (!projectsWMemberEnabled || !projectsWMemberEnabled.length) {
      console.log('No project with member counter enabled')
    }
    projectsWMemberEnabled.map(pid => {
      this.statsQueue.addJob('doneTasksByMember', pid)
    })

  }
}
