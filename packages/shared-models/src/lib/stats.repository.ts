import { StatsType } from "@prisma/client";
import { statsModel } from "./_prisma";

export default class StatsRepository {
  async getProjectReport({
    projectIds,
    duration
  }: {
    projectIds: string[],
    duration: string
  }) {

    if (!projectIds.length) return null

    const [startStr, endStr] = duration.split('-')
    const [sY, sM, sD] = startStr.split('/')
    const [eY, eM, eD] = endStr.split('/')

    const results = await statsModel.findMany({
      where: {
        type: StatsType.PROJECT_TASK_BY_DAY,
        projectId: {
          in: projectIds
        },
        AND: [
          {
            AND: [
              { date: { gte: +sD } },
              { month: { gte: +sM } },
              { year: { gte: +sY } },
            ]
          },
          {
            AND: [
              { date: { lte: +eD } },
              { month: { lte: +eM } },
              { year: { lte: +eY } },
            ]
          }
        ]
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
    duration
  }: {
    memberId: string
    projectIds: string[]
    duration: string
  }) {

    if (!memberId) return null

    const [startStr, endStr] = duration.split('-')
    const [sY, sM, sD] = startStr.split('/')
    const [eY, eM, eD] = endStr.split('/')

    const results = await statsModel.findMany({
      where: {
        type: StatsType.MEMBER_TASK_BY_DAY,
        projectId: {
          in: projectIds
        },
        uid: memberId,
        AND: [
          {
            AND: [
              { date: { gte: +sD } },
              { month: { gte: +sM } },
              { year: { gte: +sY } },
            ]
          },
          {
            AND: [
              { date: { lte: +eD } },
              { month: { lte: +eM } },
              { year: { lte: +eY } },
            ]
          }
        ]
      },
      orderBy: {
        date: 'asc'
      }

    })

    return results

  }
}
