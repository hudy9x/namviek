// import { StatsType } from "@prisma/client";
// import { statsModel } from "./_prisma";
import { statsModel, IStatsField, StatsType } from "../schema";


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

    const results = await statsModel.find({

      type: StatsType.PROJECT_TASK_BY_DAY,
      projectId: { $in: projectIds },
      $and: [
        {
          $and: [
            { date: { $gte: +sD } },
            { month: { $gte: +sM } },
            { year: { $gte: +sY } }
          ]
        },
        {
          $and: [
            { date: { $lte: +eD } },
            { month: { $lte: +eM } },
            { year: { $lte: +eY } }
          ]
        }
      ]
    }).sort({ date: 1 })

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
    let cond = {}

    if (projectIds.length) {
      cond = {
        ...cond,
        projectId: {
          $in: projectIds
        }
      }
    }

    const results = await statsModel.find({
      type: StatsType.MEMBER_TASK_BY_DAY,
      uid: memberId,
      ...cond,
      $and: [
        {
          $and: [
            { date: { $gte: +sD } },
            { month: { $gte: +sM } },
            { year: { $gte: +sY } },
          ]
        },
        {
          $and: [
            { date: { $lte: +eD } },
            { month: { $lte: +eM } },
            { year: { $lte: +eY } },
          ]
        }
      ]

    }).sort({ date: 1 })

    return results

  }
}
