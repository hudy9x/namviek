// import { projectModel } from "./_prisma";
import { projectModel } from "../schema";

export default class ProjectRepository {
  async getAvailableProjects() {

    return projectModel.find({
      isArchived: false
    })
  }

  async getAvailableProjectIds() {
    const projects = await this.getAvailableProjects()

    return projects.map(p => p.id)
  }

  // this method is used for events/stats.day.event.ts
  async getProjectsWithCountSettingEnabled() {
    const projects = await projectModel.find({
      isArchived: false,
      countProjectTask: true
    })

    const projectsWMemberEnabled: string[] = []

    const projectsWCounterEnabled = projects.map(p => {
      if (p.countMemberTask) {
        projectsWMemberEnabled.push(p.id)
      }

      return p.id
    })

    // these count settings is used for counting the number of tasks by days
    return {
      projectsWMemberEnabled,
      projectsWCounterEnabled
    }
  }

}
