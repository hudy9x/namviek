import { StatsType } from "@prisma/client";
import { projectModel, statsModel } from "./_prisma";

export default class StatsRepository {
  async getProjectReport({ orgId, projectIds, month, year }: { orgId: string, projectIds: string[], month: number, year: number }) {

    // const projects = await projectModel.findMany({
    //   where: {
    //     organizationId: orgId
    //   }
    // })

    // if (!projects.length) return null

    // const projectIds = projects.map(p => p.id)

    if (!projectIds.length) return null

    const results = await statsModel.findMany({
      where: {
        type: StatsType.PROJECT_TASK_BY_DAY,
        projectId: {
          in: projectIds
        },
        year,
        month
      },
      orderBy: {
        date: 'asc'
      }
    })

    return results
  }
}
