import StatsRepository from "packages/shared-models/src/lib/stats.repository"

export default class StatsService {
  statsRepo: StatsRepository
  constructor() {
    this.statsRepo = new StatsRepository()
  }

  async getProjectReport({ orgId, month, year, projectIds }: { orgId: string, projectIds: string[], month: number, year: number }) {
    const result = await this.statsRepo.getProjectReport({
      projectIds,
      orgId,
      month,
      year
    })

    return result

  }
}
