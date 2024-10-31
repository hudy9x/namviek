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
  Delete,
  Param
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
    const { projectId } = req.params as { projectId: string }

    console.log('projectId', req.params)

    const result = await this.fieldService.getAllByProjectId(projectId)

    res.json({ status: 200, data: result })
  }

  @Post('')
  async create(
    @Body() body: Omit<Field, 'id'>,
    @Res() res: ExpressResponse
  ) {

    console.log('Field data', body)

    const result = await this.fieldService.create(body.type, body)

    console.log('ret data', result)

    res.json({ status: 200, data: result })

  }

  @Put('')
  async update(@Res() res: Response, @Req() req: Request, @Next() next) {
    const body = req.body as Field
    console.log('edit custom field', body)
    const result = await this.fieldService.update(body)

    res.json({ status: 200, data: result })
  }

  @Delete('/:id')
  async delete(@Param() params, @Res() res: Response) {
    try {
      const { id } = params
      await this.fieldService.delete(id)
      res.json({ status: 200, data: 1 })
    } catch (error) {
      res.json({
        status: 500,
        err: error
      })
    }
  }
}
