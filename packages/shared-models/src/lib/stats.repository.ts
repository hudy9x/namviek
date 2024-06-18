import { StatsType } from "@prisma/client";
import { statsModel } from "./_prisma";

export default class StatsRepository {
  async getProjectReport({
    projectIds,
    month,
    year
  }: {
    projectIds: string[],
    month: number,
    year: number
  }) {

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

  async getMemberReport({
    memberId,
    projectIds,
    month,
    year
  }: {
    memberId: string
    projectIds: string[]
    month: number
    year: number
  }) {

    if (!memberId) return null

    const results = await statsModel.findMany({
      where: {
        type: StatsType.MEMBER_TASK_BY_DAY,
        projectId: {
          in: projectIds
        },
        uid: memberId,
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
