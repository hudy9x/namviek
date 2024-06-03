import { ProjectView } from "@prisma/client"
import { pmClient, projectViewModel } from "./_prisma";

export default class ProjectViewRepository {
  async create(data: Omit<ProjectView, 'id'>) {
    const res = await pmClient.$transaction(async tx => {

      const latestOrder = await tx.projectView.findFirst({
        where: {
          projectId: data.projectId,
        },
        orderBy: {
          order: 'desc'
        }
      })

      const nextOrder = latestOrder ? latestOrder.order : 0
      data.order = nextOrder ? nextOrder + 1 : 1
      console.log('data.order', data.order)
      const result = await tx.projectView.create({
        data
      })

      return result
    })

    return res
  }

  async getOne(id: string) {
    return projectViewModel.findFirst({
      where: {
        id
      }
    })
  }
}
