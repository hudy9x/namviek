import { pmClient } from 'packages/shared-models/src/lib/_prisma'
import {
  BaseController,
  Body,
  Controller,
  UseMiddleware,
  Post,
  Req
} from '../../core'
import { pusherServer } from '../../lib/pusher-server'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'

interface ITaskReorderData {
  sourceColId: string
  sourceIndex: number
  destIndex: number
  projectId: string
}

@Controller('/event')
@UseMiddleware([authMiddleware])
export class EventController extends BaseController {
  @Post('/task-reorder')
  async taskReorder(@Body() body: ITaskReorderData, @Req() req: AuthRequest) {
    const { projectId, ...rest } = body
    const { id } = req.authen
    const eventName = `event-task-reorder-${projectId}`

    console.log('trigger event task reorder ', body)

    pusherServer.trigger('team-collab', eventName, {
      ...rest,
      triggerBy: id
    })
    return 1
  }

  @Post('/task-move-to-other-board')
  async moveToOtherBoard(@Body() body: unknown, @Req() req: AuthRequest) {
    const { projectId, ...rest } = body as {
      sourceColId: string
      sourceIndex: number
      destIndex: number
      destColId: string
      projectId: string
    }
    const { id } = req.authen
    const eventName = `event-move-task-to-other-board-${projectId}`

    console.log(`trigger event ${eventName} `, body)

    pusherServer.trigger('team-collab', eventName, {
      ...rest,
      triggerBy: id
    })
    return 1
  }
}
