import ProjectRepository from "packages/database/src/lib/project.repository";

export default class ProjectService {
  projectRepo: ProjectRepository
  constructor() {
    this.projectRepo = new ProjectRepository()
  }
  async getAllProjectIds() {
    const projectIds = await this.projectRepo.getAvailableProjectIds()

    return projectIds
  }

}
