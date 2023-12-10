import { mdMemberGetAllByProjectId, mdScheduler } from '@shared/models'
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
      const result = await mdScheduler.getByName('remind-at-0845am')

      if (!result) return res.status(500).send('NOTHING_FOUND')
      const projectMembers = await mdMemberGetAllByProjectId(result.projectId)
      const memberIds = projectMembers.map(p => p.uid)

      console.log('-------------------')
      console.log(memberIds)

      notifyToWebUsers(memberIds, {
        body: `Time to report bro 🤡`
      })

      res.status(200)
    } catch (error) {
      res.status(500).send(error)
    }
  }
}
