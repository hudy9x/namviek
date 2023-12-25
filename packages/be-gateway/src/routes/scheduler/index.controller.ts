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
import { getTaskSummary } from '../../services/task'
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
      const taskSummary = await getTaskSummary()
      for (const uid in taskSummary) {
        const {
          numUrgentTasks,
          numOverDueTasks,
          numTodayTask,
          organizationIds
        } = taskSummary[uid]

        const urgentTaskMessage = numUrgentTasks >= 0
          ? `urgent task ${numUrgentTasks}`
          : null
        const overdueTaskMessage = numOverDueTasks >= 0
          ? `overdue task ${numOverDueTasks}`
          : null
        const todayTaskMessage = numTodayTask >= 0
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
