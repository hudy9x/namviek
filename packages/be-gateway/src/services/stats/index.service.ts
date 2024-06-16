import { Stats } from "@prisma/client"
import StatsRepository from "packages/shared-models/src/lib/stats.repository"

export default class StatsService {
  statsRepo: StatsRepository
  constructor() {
    this.statsRepo = new StatsRepository()
  }

  async getProjectReport({ month, year, projectIds }: { projectIds: string[], month: number, year: number }) {
    const reports = await this.statsRepo.getProjectReport({
      projectIds,
      month,
      year
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
}
