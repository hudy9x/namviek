import {
  BaseController,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseMiddleware
} from '../../core'
import { authMiddleware } from '../../middlewares'
import { ApplicationRepository } from '@database'
import { randomBytes } from 'crypto'
import { AuthRequest } from '../../types'
import { Application } from '@prisma/client'

@Controller('/apps')
@UseMiddleware([authMiddleware])
export class ApplicationController extends BaseController {
  private appRepo: ApplicationRepository

  constructor() {
    super()
    this.appRepo = new ApplicationRepository()
  }

  @Get('/:orgId')
  async getApps(@Req() req: AuthRequest) {
    const orgId = req.params.orgId

    if (!orgId) {
      throw new Error('Organization ID is required')
    }

    const apps = await this.appRepo.getByOrgId(orgId)
    return apps
  }

  @Post('')
  async create(@Req() req: AuthRequest, @Body() body: { name: string, desc?: string, orgId: string }) {
    const { name, desc, orgId } = body
    const { id: uid } = req.authen

    // Validate required fields
    if (!name || !orgId) {
      throw new Error('Name and Organization are required')
    }

    const clientId = randomBytes(8).toString('hex')
    const clientSecret = randomBytes(16).toString('hex')

    const result = await this.appRepo.create({
      name,
      description: desc || '',
      organizationId: orgId,
      clientId,
      scopes: [],
      clientSecret,
      updatedBy: null,
      createdBy: uid,
      createdAt: new Date(),
      updatedAt: null
    })

    return result
  }

  @Put('')
  async update(@Body() body: Application, @Req() req: AuthRequest) {
    const { id, ...rest } = body
    const { id: uid } = req.authen


    if (!id) {
      throw new Error('Application ID and status are required')
    }

    const result = await this.appRepo.update(id, {
      ...rest,
      updatedBy: uid,
      updatedAt: new Date()
    })

    return result
  }

  @Delete('/:id')
  async delete(@Req() req: AuthRequest) {
    const { id } = req.params

    console.log('1', id)

    if (!id) {
      throw new Error('Application ID is required')
    }

    const result = await this.appRepo.delete(id)
    return result
  }
}
