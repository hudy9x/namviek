import { ProjectView } from "@prisma/client";
import ProjectViewRepository from "packages/shared-models/src/lib/project.view.repository";
import DataAccessException from "../../exceptions/DataAccessException";

export default class ProjectViewService {
  projectViewRepo: ProjectViewRepository
  constructor() {
    this.projectViewRepo = new ProjectViewRepository()
  }

  async create(data: Omit<ProjectView, 'id'>) {
    try {
      const result = await this.projectViewRepo.create(data)
      console.log('project view create result', result)
      return result
    } catch (error) {
      console.log(error)
      throw new DataAccessException('Project view create')
    }
  }

  async getOne(id: string) {
    try {
      const result = await this.projectViewRepo.getOne(id)

      return result
    } catch (error) {
      throw new DataAccessException('Project view found nothing')
    }
  }
}
