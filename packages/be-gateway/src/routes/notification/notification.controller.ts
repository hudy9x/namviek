import { NotificationRepository } from '@shared/models'
import {
  BaseController,
  Body,
  Controller,
  ExpressResponse,
  Get,
  Post,
  Req,
  Res,
  UseMiddleware
} from '../../core'
import { AuthRequest } from '../../types'
import { authMiddleware } from '../../middlewares'

@Controller('/notification')
@UseMiddleware([authMiddleware])
class NotificationController extends BaseController {
  notificationRepo: NotificationRepository
  constructor() {
    super()
    this.notificationRepo = new NotificationRepository()
  }
  @Get('')
  async getUserNotification(
    @Req() req: AuthRequest,
    @Res() res: ExpressResponse
  ) {
    const { id } = req.authen
    try {
      const result = await this.notificationRepo.getNotificationsByUser(id)
      console.log({ result, id })
      res.json(result)
    } catch (error) {
      console.log(error)
    }
  }
}

export default NotificationController
