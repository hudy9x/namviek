import { mdProjectView } from '@shared/models'
import {
  BaseController,
  Controller,
  Delete,
  ExpressResponse,
  UseMiddleware,
  Post,
  Put,
  Get,
  Req,
  Res,
  Param
} from '../../core'
import { ProjectViewType } from '@prisma/client'
import { AuthRequest } from '../../types'
import { authMiddleware } from '../../middlewares'
import { pusherTrigger } from '../../lib/pusher-server'
import ProjectViewService from '../../services/project/view.service'

@Controller('/project-view')
@UseMiddleware([authMiddleware])
export default class ProjectViewController extends BaseController {
  projectViewService: ProjectViewService
  constructor() {
    super()
    this.projectViewService = new ProjectViewService()
  }

  @Get('/:id')
  async getOneView(@Param() params: { id: string }) {
    console.log('get one view', params)
    const { id } = params
    const result = await this.projectViewService.getOne(id)
    return result
  }

  @Post('/')
  async addView(@Res() res: ExpressResponse, @Req() req: AuthRequest) {
    const { id: uid } = req.authen
    const { icon, name, onlyMe, type, projectId, data } = req.body as {
      name: string
      onlyMe: boolean
      icon: string
      type: ProjectViewType
      projectId: string
      data: {
        date: string
        priority: string
        point: string
        groupBy: string
        statusIds: string[]
        assigneeIds: string[]
      }
    }

    if (!data) {
      console.log('Use default config')
    }

    const result = await this.projectViewService.create({
      icon,
      name,
      onlyMe: onlyMe || false,
      order: null,
      data: data
        ? {
          date: data.date,
          priority: data.priority,
          point: data.point,
          groupBy: data.groupBy,
          statusIds: data.statusIds,
          assigneeIds: data.assigneeIds
        }
        : {},

      type,
      projectId,
      createdBy: uid,
      createdAt: new Date(),
      updatedAt: null,
      updatedBy: null
    })

    pusherTrigger('team-collab', `projectView:update-${projectId}`, {
      triggerBy: uid
    })

    console.log('added new project view 1', result.id)

    return result
  }

  @Get('/')
  async getViewByProjectId() {
    const { projectId } = this.req.query as { projectId: string }
    const req = this.req as AuthRequest
    const { id } = req.authen

    console.log('1')

    const result = await mdProjectView.getByProject(projectId, id)
    return result
  }

  @Put('/')
  async updateViewName(@Res() res: ExpressResponse, @Req() req: AuthRequest) {
    const { id: uid } = req.authen
    const { name, id, onlyMe, data, type, icon } = req.body as {
      id: string
      onlyMe: boolean
      name: string
      icon: string
      type: ProjectViewType
      projectId: string
      data: {
        date: string
        priority: string
        point: string
        groupBy: string
        statusIds: string[]
        assigneeIds: string[]
      }
    }

    const result = await mdProjectView.update(id, {
      name,
      onlyMe: onlyMe || false,
      icon,
      data: data
        ? {
          date: data.date,
          priority: data.priority,
          point: data.point,
          groupBy: data.groupBy,
          statusIds: data.statusIds,
          assigneeIds: data.assigneeIds
        }
        : {},
      type,
      updatedAt: new Date(),
      updatedBy: uid
    })

    pusherTrigger(
      'team-collab',
      `projectView:update-${result.projectId}`,
      {
        triggerBy: uid
      }
    )

    return result
  }

  @Delete('/')
  async deleteView(@Res() res: ExpressResponse, @Req() req: AuthRequest) {
    const { id: uid } = req.authen
    const { id } = req.query as { id: string }
    const result = await mdProjectView.delete(id)

    pusherTrigger(
      'team-collab',
      `projectView:update-${result.projectId}`,
      {
        triggerBy: uid
      }
    )

    return result
  }
}
