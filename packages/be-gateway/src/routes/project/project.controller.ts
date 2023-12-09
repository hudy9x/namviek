import { mdProjectArchive } from '@shared/models'
import {
  BaseController,
  Body,
  Controller,
  ExpressResponse,
  Post,
  Req,
  Res
} from '../../core'
import { AuthRequest } from '../../types'

@Controller('/project')
class Project extends BaseController {
  @Post('/archive')
  async archive(
    @Body() body,
    @Req() req: AuthRequest,
    @Res() res: ExpressResponse
  ) {
    console.log('1')
    const { id } = req.authen
    const { projectId, archive } = body as {
      projectId: string
      archive: boolean
    }

    try {
      const result = await mdProjectArchive({
        projectId,
        isArchived: archive,
        updatedAt: new Date(),
        updatedBy: id
      })
      res.json({
        data: result
      })
    } catch (error) {
      console.log(error)
      res.status(error)
    }
  }
}

export default Project
