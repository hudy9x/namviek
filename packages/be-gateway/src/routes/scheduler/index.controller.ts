import { mdScheduler } from '@shared/models'
import {
  BaseController,
  Body,
  Controller,
  ExpressResponse,
  Get,
  Post,
  Req,
  Res
} from '../../core'
import { notifyToWebUsers } from '../../lib/buzzer'
import { AuthRequest } from '../../types'
import { Scheduler } from '@prisma/client'
import { getTaskCountsBySetting } from '../../services/task'
import { genFrontendUrl } from '../../lib/url'

@Controller('/scheduler')
export default class Schedule extends BaseController {
  @Post('/')
  async createScheduler(
    @Body() body: Partial<Scheduler>,
    @Req() req: AuthRequest,
    @Res() res: ExpressResponse
  ) {
    console.log(body)
    const {
      name = 'Untitled',
      pattern = '',
      data = {},
      organizationId,
      projectId
    } = body

    try {
      const result = await mdScheduler.create({
        name,
        pattern,
        data,
        cronId: null,
        projectId,
        organizationId,
        createdAt: new Date(),
        createdBy: null
      })

      res.status(200).json({
        data: result
      })
    } catch (error) {
      res.status(500).send(error)
    }
  }
  @Get('/remind-at-0845am')
  async remindTaskReportEveryMorning(@Res() res: ExpressResponse) {
    try {
      const tasksBySetting = await getTaskCountsBySetting()
      for (const uid in tasksBySetting) {
        const {
          numUrgentTasks,
          numOverDueTasks,
          numTodayTask,
          organizationIds
        } = tasksBySetting[uid]

        const urgentTaskMessage = numUrgentTasks
          ? `urgent task ${numUrgentTasks}`
          : null
        const overdueTaskMessage = numOverDueTasks
          ? `overdue task ${numOverDueTasks}`
          : null
        const todayTaskMessage = numTodayTask
          ? `today task ${numTodayTask}`
          : null

        const notificationBody = `
          ${urgentTaskMessage}
          ${overdueTaskMessage}
          ${todayTaskMessage}
        `

        organizationIds.forEach(org => {
          const taskLink = genFrontendUrl(`${org}/my-works`)
          notifyToWebUsers(uid, { body: notificationBody, deep_link: taskLink })
        })
      }
      res.status(200)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
