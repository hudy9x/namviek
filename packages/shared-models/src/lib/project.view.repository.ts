import { ProjectView } from "@prisma/client"
import { pmClient } from "./_prisma";

export default class ProjectViewRepository {
  async create(data: Omit<ProjectView, 'id'>) {
    const res = await pmClient.$transaction(async tx => {

      const max = await tx.projectView.count({
        where: {
          projectId: data.projectId
        }
      })


      console.log('max', max)
      data.order = max || 1
      console.log('data.order', data.order)
      const result = await tx.projectView.create({
        data
      })

      return result
    })

    return res
  }
}
