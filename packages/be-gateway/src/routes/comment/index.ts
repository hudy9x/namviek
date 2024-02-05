import { Request, Response } from 'express'
import {
  mdCommentAdd,
  mdCommentDel,
  mdCommentGetAllByTask,
  mdCommentUpdate
} from '@shared/models'
import { Comment } from '@prisma/client'
import {
  BaseController,
  Controller,
  Res,
  Req,
  Body,
  Next,
  Param,
  Query,
  ExpressResponse,
  Get,
  Post,
  Put,
  Delete
} from '../../core'
import { pusherServer } from '../../lib/pusher-server'
import { AuthRequest } from '../../types'

@Controller('/comment')
export default class TaskComment extends BaseController {
  name: string
  constructor() {
    super()
    this.name = 'comment'
  }

  @Get('')
  async getCommentByObjectId(
    @Res() res: Response,
    @Req() req: Request,
    @Next() next
  ) {
    const { taskId } = req.query as { taskId: string }

    try {
      console.log('2')
      const results = await mdCommentGetAllByTask(taskId)
      // results.sort((a, b) => (a.createdAt < b.createdAt ? 1 : 0))
      res.json({ status: 200, data: results })
    } catch (error) {
      res.json({
        status: 500,
        err: error,
        data: []
      })
    }
  }

  @Post('')
  createComment(
    @Body() body: Omit<Comment, 'id'>,
    @Res() res: ExpressResponse,
    @Req() req: AuthRequest
  ) {
    mdCommentAdd(body)
      .then(result => {
        const { taskId, createdBy, ...rest } = body as Comment
        const eventName = `event-send-task-comment-${taskId}`

        console.log(`trigger event ${eventName} `, body)

        pusherServer.trigger('team-collab', eventName, {
          ...rest,
          triggerBy: createdBy
        })

        res.json({ status: 200, data: result })
      })
      .catch(error => {
        console.log({ error })
        res.json({
          status: 500,
          err: error
        })
      })
  }

  @Put('')
  updateComment(@Res() res: Response, @Req() req: AuthRequest, @Next() next) {
    const body = req.body as Comment
    const { id, ...rest } = body
    mdCommentUpdate(id, rest)
      .then(result => {
        const { id: updatedBy } = req.authen
        const { taskId, ...rest } = body as Comment
        const eventName = `event-update-task-comment-${taskId}`

        console.log(`trigger event ${eventName} `, body)

        pusherServer.trigger('team-collab', eventName, {
          ...rest,
          triggerBy: updatedBy
        })

        res.json({ status: 200, data: result })
      })
      .catch(error => {
        console.log({ error })
        res.json({
          status: 500,
          err: error
        })
      })
  }

  @Delete('')
  async adminDelete(@Param() params, @Res() res: Response) {
    try {
      const { id, taskId, updatedBy } = params
      const result = await mdCommentDel(id)
      const eventName = `event-update-task-comment-${taskId}`

      console.log(`trigger event ${eventName} `, id)

      pusherServer.trigger('team-collab', eventName, {
        id,
        triggerBy: updatedBy
      })

      res.json({ status: 200, data: result })
    } catch (error) {
      res.json({
        status: 500,
        err: error
      })
    }
  }
}
