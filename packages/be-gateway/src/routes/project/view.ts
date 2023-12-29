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
    const { name, type, projectId } = req.body as {
      name: string
      type: ProjectViewType
      projectId: string
    }

    const result = await mdProjectView.add({
      icon: null,
      name,
      type,
      projectId,
      createdBy: uid,
      createdAt: new Date(),
      updatedAt: null,
      updatedBy: null
    })

    console.log(result)
    return result
  }

  @Get('/')
  async getView() {
    const { projectId } = this.req.query as { projectId: string }

    const result = await mdProjectView.getByProject(projectId)

    console.log('result', result)

    return result
  }

  @Put('/')
  updateView(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
    res.json({ data: 1 })
  }

  @Delete('/')
  deleteView(@Res() res: ExpressResponse, @Req() req: ExpressRequest) {
    res.json({ data: 1 })
  }
}
