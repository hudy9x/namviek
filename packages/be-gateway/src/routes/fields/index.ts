import { Request, Response } from 'express'
import { Field } from '@prisma/client'
import {
  BaseController,
  Controller,
  Res,
  Req,
  Body,
  Next,
  Query,
  ExpressResponse,
  Get,
  Post,
  Put,
  Delete
} from '../../core'
import { FieldService } from '../../services/field'

@Controller('/fields')
export default class FieldController extends BaseController {
  fieldService: FieldService
  constructor() {
    super()
    this.fieldService = new FieldService()
  }

  @Get('/:projectId')
  async getAllFieldsByProject(
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const { projectId } = req.query as { projectId: string }

    const result = await this.fieldService.getAllByProjectId(projectId)

    console.log('2')
    res.json({ status: 200, data: result })
  }

  @Post('')
  create(
    @Body() body: Omit<Field, 'id'>,
    @Res() res: ExpressResponse
  ) {

    console.log('body', body)

    const result = this.fieldService.create(body.type, body)


    res.json({ status: 200, data: result })

  }

  @Put('')
  update(@Res() res: Response, @Req() req: Request, @Next() next) {
    const body = req.body as Field
    const { id, ...dataUpdate } = body

    res.json({ status: 200, data: 1 })
    // mdActivityUpdate(id, dataUpdate)
    //   .then(result => {
    //     res.json({ status: 200, data: result })
    //   })
    //   .catch(error => {
    //     console.log({ error })
    //     res.json({
    //       status: 500,
    //       err: error
    //     })
    //   })
  }

  @Delete(':id')
  async delete(@Query() query, @Res() res: Response) {
    try {
      const { id } = query
      // const result = await mdActivityAdd(id)
      // res.json({ status: 200, data: result })
      res.json({ status: 200, data: 1 })
    } catch (error) {
      res.json({
        status: 500,
        err: error
      })
    }
  }
}
