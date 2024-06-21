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
    projectIds: string[]
    duration: string
  }) {
    const { projectIds, duration } = body
    console.log('5l', projectIds)

    if (!duration) { return null }

    const result = await this.statsService.getProjectReport({
      // orgId,
      projectIds,
      duration
    })

    return Object.fromEntries(result.entries())
  }

  @Post('/members')
  async getMemberReportByProjectId(@Body() body: {
    projectIds: string[]
    memberId: string
    duration: string
  }) {
    const { memberId, projectIds, duration } = body

    console.log(15)
    const result = await this.statsService.getMemberReport({
      memberId,
      projectIds,
      duration
    })

    return Object.fromEntries(result.entries())
  }

}
