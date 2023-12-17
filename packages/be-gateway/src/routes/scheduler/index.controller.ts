import {
  getTaskBySetting,
  mdScheduler,
} from '@shared/models'
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
      const tasksBySetting = await getTaskBySetting();
      for (const uid in tasksBySetting) {
        const { numUrgentTasks, numOverDueTasks, numTodayTask } = tasksBySetting[uid];
      
        const urgentTaskMessage = numUrgentTasks >= 0 ? `urgent task ${numUrgentTasks}` : null;
        const overdueTaskMessage = numOverDueTasks >= 0 ? `overdue task ${numOverDueTasks}` : null;
        const todayTaskMessage = numTodayTask >= 0 ? `today task ${numTodayTask}` : null;
      
        const notificationBody = `
          ${urgentTaskMessage ? urgentTaskMessage : ''}
          ${overdueTaskMessage ? overdueTaskMessage : ''}
          ${todayTaskMessage ? todayTaskMessage : ''}
        `;
      
        notifyToWebUsers(uid, { body: notificationBody });
      }
      res.status(200)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
