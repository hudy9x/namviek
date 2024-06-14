import { BaseController, UseMiddleware, Controller, Get, Param } from "../../core";

import { authMiddleware } from "../../middlewares";
import StatsService from "../../services/stats/index.service";

@Controller('/report')
@UseMiddleware([authMiddleware])
export default class ReportController extends BaseController {

  statsService: StatsService
  constructor() {
    super()
    this.statsService = new StatsService()
  }

  @Get('/:orgId/:month/:year')
  async getProjectReportByOrgId(@Param() params: {
    orgId: string
    month: string
    year: string
  }) {
    const { orgId, month, year } = params
    console.log('3')
    const result = await this.statsService.getProjectReport({
      orgId,
      month: parseInt(month),
      year: parseInt(year)
    })

    return result
  }

}
