import {
  BaseController,
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseMiddleware
} from '../../core'
import { AuthRequest } from '../../types'
import { authMiddleware } from '../../middlewares'
import { ProjectSettingRepository } from '@shared/models'
import BadRequestException from '../../exceptions/BadRequestException'
import ProjectSettingReportService, { IProjectReportSettingBody } from '../../services/project/setting.report.service'

@Controller('/project-setting')
@UseMiddleware([authMiddleware])
class ProjectSetting extends BaseController {
  settingRepo: ProjectSettingRepository
  settingReportService: ProjectSettingReportService
  constructor() {
    super()
    this.settingRepo = new ProjectSettingRepository()
    this.settingReportService = new ProjectSettingReportService()
  }

  @Get('/daily-report/:projectId')
  async getDailyReportSetting() {
    console.log(1)
    const { projectId } = this.req.params as { projectId: string }
    const result = await this.settingReportService.getReportSetting(projectId)
    return result
  }
  @Put('/daily-report')
  async updateDailyReportSetting(@Body() body: IProjectReportSettingBody) {
    const result = await this.settingReportService.updateReportSetting(body)
    return result
  }
  @Get('/notification')
  async getAllNotificationSetting(@Req() req: AuthRequest) {
    const { id } = req.authen
    const { projectId } = this.req.query as { projectId: string }
    try {

      console.log('projectid', projectId)

      const settings = await this.settingRepo.getMyNotifySettings({
        uid: id,
        projectId
      })

      return settings
    } catch (error) {

      throw new BadRequestException(error)
    }
  }
  @Put('/notification')
  async UpdateNotificationSetting(@Body() body, @Req() req: AuthRequest) {
    const { id } = req.authen
    const { projectId, taskChanges, remind, overdue } = body as {
      projectId: string
      taskChanges: boolean
      remind: boolean
      overdue: boolean
    }

    try {
      console.log('body', body)
      await this.settingRepo.updateOrCreateNotifySetting({
        uid: id,
        projectId,
        taskChanges: !!taskChanges || false,
        remind: !!remind || false,
        overdue: !!overdue || false,
        createdAt: new Date(),
        createdBy: id
      })

      return 1
    } catch (error) {
      throw new BadRequestException(error)
    }


  }
}

export default ProjectSetting
