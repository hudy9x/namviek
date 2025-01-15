import { Request, Response } from 'express'
import {
  mdActivityAdd,
  mdActivityGetAllByTask,
  mdActivityUpdate
} from '@shared/models'
import { Activity } from '@prisma/client'
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

@Controller('/activity')
export default class TaskActivity extends BaseController {
  name: string
  constructor() {
    super()
    this.name = 'activity'
  }

  @Get('')
  async getActivityByObjectId(
    @Res() res: Response,
    @Req() req: Request,
    @Next() next
  ) {
    const { objectId } = req.query as { objectId: string }

    try {
      console.log('2')
      const results = await mdActivityGetAllByTask(objectId)
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
  createActivity(
    @Body() body: Omit<Activity, 'id'>,
    @Res() res: ExpressResponse
  ) {
    mdActivityAdd(body)
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
  updateActivity(@Res() res: Response, @Req() req: Request, @Next() next) {
    const body = req.body as Activity
    const { id, ...dataUpdate } = body
    mdActivityUpdate(id, dataUpdate)
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
  async adminDelete(@Param() params, @Res() res: Response) {
    try {
      const { id } = params
      const result = await mdActivityAdd(id)
      res.json({ status: 200, data: result })
    } catch (error) {
      res.json({
        status: 500,
        err: error
      })
    }
  }
}
