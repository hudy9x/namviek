import {
  BaseController,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseMiddleware
} from '../../core'
import { authMiddleware } from '../../middlewares'

@Controller('/apps')
@UseMiddleware([authMiddleware])
export class ApplicationController extends BaseController {
  @Get('/:orgId')
  async getApps() {
    console.log(1)
  }

  @Post('')
  async create() {
    console.log(1)
  }

  @Put('')
  async update() {
    console.log(1)
  }

  @Delete('')
  async delete() {
    console.log(1)
  }
}
