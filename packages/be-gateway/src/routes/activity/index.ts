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

@Controller('/comment')
export default class TaskComment extends BaseController {
  name: string
  constructor() {
    super()
    this.name = 'comment'
  }

  @Get('')
  async getCommentByTaskId(
    @Res() res: Response,
    @Req() req: Request,
    @Next() next
  ) {
    const { taskId } = req.query as { taskId: string }

    try {
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
    @Res() res: ExpressResponse
  ) {
    mdCommentAdd(body)
      .then(result => {
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
  updateComment(@Res() res: Response, @Req() req: Request, @Next() next) {
    const body = req.body as Comment
    const { id, ...dataUpdate } = body
    mdCommentUpdate(id, dataUpdate)
      .then(result => {
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
  async deleteComment(@Param() params, @Res() res: Response) {
    try {
      const { id } = params
      const result = await mdCommentDel(id)
      // const result = await mdCommentAdd(id)
      res.json({ status: 200, data: result })
    } catch (error) {
      res.json({
        status: 500,
        err: error
      })
    }
  }
}
