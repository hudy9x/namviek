import { Request, Response } from 'express'
import {
  Controller,
  Delete,
  ExpressResponse,
  Get,
  Post,
  Put,
  Res,
  Req,
  Body,
  Next,
  Param,
  Query,
  AbstractController
} from '../core'

@Controller('/admin')
export default class AdminController extends AbstractController {
  name: string
  constructor() {
    super()
    console.log()
    this.name = 'admin controller'
  }

  @Get('/get')
  something(@Res() res: ExpressResponse, @Param() params, @Query() query) {
    console.log('called me')
    console.log('params', params)
    console.log('query', query)
    res.send('done')
  }

  @Get('/:name')
  getName(@Param() params) {
    console.log('params', params)
    this.res.send('done hee' + this.name)
  }

  @Post('')
  addAdmin(@Body() body, @Res() res: ExpressResponse) {
    console.log(body)
    res.send('done')
  }

  @Put('/update-admin')
  adminDelete(req, res) {
    console.log()
    res.send('done admin update')
  }

  @Delete('/delete-info')
  deleteInfo(@Res() res: Response, @Req() req: Request, @Next() next) {
    console.log('called delete info')
    console.log(req.headers)
    console.log(this.name)
    res.send('called delte info')
  }
}
