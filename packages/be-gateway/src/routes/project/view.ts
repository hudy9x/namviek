import { mdProjectView } from '@shared/models'
import {
  BaseController,
  Controller,
  Delete,
  ExpressRequest,
  ExpressResponse,
  UseMiddleware,
  Post,
  Put,
  Get,
  Req,
  Res
} from '../../core'
import { ProjectViewType } from '@prisma/client'
import { AuthRequest } from '../../types'
import { authMiddleware } from '../../middlewares'

@Controller('/project-view')
@UseMiddleware([authMiddleware])
export default class ProjectViewController extends BaseController {
  @Post('/')
  async addView(@Res() res: ExpressResponse, @Req() req: AuthRequest) {
    const { id: uid } = req.authen
    const { icon, name, type, projectId, data } = req.body as {
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
      }
    }

    if (!data) {
      console.log('error')
    }

    console.log(icon)

    const result = await mdProjectView.add({
      icon,
      name,
      order: null,
      data: data ? {
        date: data.date,
        priority: data.priority,
        point: data.point,
        groupBy: data.groupBy,
        statusIds: data.statusIds
      } : {},

      type,
      projectId,
      createdBy: uid,
      createdAt: new Date(),
      updatedAt: null,
      updatedBy: null
    })

    console.log('added new project view', result.id)

    return result
  }

  @Get('/')
  async getView() {
    const { projectId } = this.req.query as { projectId: string }

    const result = await mdProjectView.getByProject(projectId)
    return result
  }

  @Put('/')
  async updateView(@Res() res: ExpressResponse, @Req() req: AuthRequest) {
    const { id: uid } = req.authen
    const { name, id } = req.body as { id: string, name: string }

    const result = await mdProjectView.update(id, {
      name: name,
      updatedAt: new Date(),
      updatedBy: uid
    })

    return result
  }

  @Delete('/')

  async deleteView(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
    const { id } = req.query as { id: string }
    const result = await mdProjectView.delete(id)

    return result
  }
}
