import {
  BaseController,
  Body,
  Controller,
  Put,
  Req,
  UseMiddleware
} from '../../core'
import { AuthRequest } from '../../types'
import { authMiddleware } from '../../middlewares'
import { ProjectSettingRepository } from '@shared/models'

@Controller('/project-setting')
@UseMiddleware([authMiddleware])
class ProjectSetting extends BaseController {
  settingRepo: ProjectSettingRepository
  constructor() {
    super()
    this.settingRepo = new ProjectSettingRepository()
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
  }
}

export default ProjectSetting
