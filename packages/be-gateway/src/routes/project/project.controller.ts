import { mdProjectArchive } from "@shared/models";
import { BaseController, Body, Controller, ExpressResponse, Post, Res } from "../../core";


@Controller('/project')
class Project extends BaseController {
  @Post('/archive')
  async archive(@Body() body, @Res() res: ExpressResponse) {
    const { projectId, archive } = body as { projectId: string, archive: boolean }

    try {
      console.log(archive, typeof archive)
      const result = await mdProjectArchive(projectId, archive)
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
