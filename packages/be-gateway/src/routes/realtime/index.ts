import { BaseController, Controller, Get, UseMiddleware } from "../../core";
import { authMiddleware } from "../../middlewares";


@Controller('/realtime')
@UseMiddleware([authMiddleware])
export default class RealtimeController extends BaseController {

  @Get('/send/:orgId')
  async sendMessageToOrganization() {
    console.log(1)
    return 1
  }

}
