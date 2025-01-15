import { Stats } from "@prisma/client"
import StatsRepository from "packages/shared-models/src/lib/stats.repository"

export default class StatsService {
  statsRepo: StatsRepository
  constructor() {
    this.statsRepo = new StatsRepository()
  }

  async getProjectReport({ duration, projectIds }:
    { projectIds: string[], duration: string }) {
    const reports = await this.statsRepo.getProjectReport({
      projectIds,
      duration
    })

    if (!reports) {
      return null
    }

    const statsByProject = new Map<string, Stats[]>()

    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];
      const key = report.projectId
      const datas = statsByProject.get(key) || []

      datas.push(report)

      statsByProject.set(key, datas)
    }

    return statsByProject

  }

  async getMemberReport({
    memberId,
    projectIds,
    duration
  }: {
    projectIds: string[]
    memberId: string
    duration: string
  }) {

    const reports = await this.statsRepo.getMemberReport({
      projectIds,
      memberId,
      duration
    })

    if (!reports) {
      return null
    }

    const statsData = new Map<number, number>()

    for (let i = 0; i < reports.length; i++) {
      const report = reports[i];
      const key = report.date
      const dt = report.data as { doneTotal: number }
      const totalByDate = dt && dt.doneTotal ? dt.doneTotal : 0
      const total = statsData.get(key) || 0

      statsData.set(key, total + totalByDate)
    }

    return statsData
  }
}
