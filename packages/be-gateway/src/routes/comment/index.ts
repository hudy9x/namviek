import { Request, Response } from 'express'
import { CommentRepository } from '@shared/models'
import { Comment } from '@prisma/client'
import {
  BaseController,
  Controller,
  Res,
  Req,
  Body,
  Next,
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
  commentRepo: CommentRepository
  constructor() {
    super()
    this.name = 'comment'
    this.commentRepo = new CommentRepository()
  }

  @Get('')
  async getCommentByObjectId(@Res() res: Response, @Req() req: Request) {
    const { taskId } = req.query as { taskId: string }

    try {
      const results = await this.commentRepo.mdCommentGetAllByTask(taskId)
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
    this.commentRepo
      .mdCommentAdd(body)
      .then(result => {
        const { taskId } = body as Comment
        const eventName = `event-send-task-comment-${taskId}`

        console.log(`trigger event ${eventName} `, body)

        pusherServer.trigger('team-collab', eventName, {
          ...result
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
    this.commentRepo
      .mdCommentUpdate(id, rest)
      .then(result => {
        const { taskId } = result as Comment
        const eventName = `event-update-task-comment-${taskId}`

        console.log(`trigger event ${eventName} `, body)

        pusherServer.trigger('team-collab', eventName, {
          ...result
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
  async commentDelete(@Req() req: Request, @Res() res: Response) {
    try {
      const { id, taskId, updatedBy } = req.query as {
        id: string
        taskId: string
        updatedBy: string
      }
      const result = await this.commentRepo.mdCommentDel(id)
      const eventName = `event-delete-task-comment-${taskId}`

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
