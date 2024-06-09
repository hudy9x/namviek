import { projectModel } from "./_prisma";
export default class ProjectRepository {
  async getAvailableProjects() {

    return projectModel.findMany({
      where: { isArchived: false }
    })
  }

  async getAvailableProjectIds() {
    const projects = await this.getAvailableProjects()

    return projects.map(p => p.id)
  }

}
