import { BaseController, UseMiddleware, Body, Controller, Post, Param } from "../../core";

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

  @Post('/project')
  async getProjectReportByOrgId(@Body() body: {
    orgId: string
    projectIds: string[]
    month: string
    year: string
  }) {
    const { orgId, projectIds, month, year } = body
    console.log('5l', projectIds)

    const result = await this.statsService.getProjectReport({
      // orgId,
      projectIds,
      month: parseInt(month),
      year: parseInt(year)
    })

    return Object.fromEntries(result.entries())
  }

  @Post('/members')
  async getMemberReportByProjectId(@Body() body: {
    projectIds: string[]
    memberId: string
    month: string
    year: string
  }) {
    const { memberId, projectIds, month, year } = body

    console.log(15)
    const result = await this.statsService.getMemberReport({
      memberId,
      projectIds,
      month: parseInt(month),
      year: parseInt(year)
    })

    return Object.fromEntries(result.entries())
  }

}
