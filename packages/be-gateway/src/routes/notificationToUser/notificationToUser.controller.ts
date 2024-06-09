import { NotificationToUserRepository } from '@shared/models'
import {
  BaseController,
  Body,
  Controller,
  ExpressResponse,
  Get,
  Put,
  Req,
  Res,
  UseMiddleware
} from '../../core'
import { AuthRequest } from '../../types'
import { authMiddleware } from '../../middlewares'
import { NotificationToUser } from '@prisma/client'

@Controller('/notificationToUser')
@UseMiddleware([authMiddleware])
class NotificationToUserController extends BaseController {
  notificationToUserRepo: NotificationToUserRepository
  constructor() {
    super()
    this.notificationToUserRepo = new NotificationToUserRepository()
  }
  @Get('')
  async getUserNotificationToUser(
    @Req() req: AuthRequest,
    @Body() body,
    @Res() res: ExpressResponse
  ) {
    try {
      const { id } = req.authen
      const { limit, offset } = body
      const result = await this.notificationToUserRepo.getNotificationsToUser(
        id,
        offset,
        limit
      )
      res.json({ data: result, status: 200 })
    } catch (error) {
      res.json({
        status: 500,
        err: error,
        data: []
      })
    }
  }

  @Put('')
  async updateNotificationToUser(
    @Body() body,
    @Req() req: AuthRequest,
    @Res() res: ExpressResponse
  ) {
    try {
      const result = await this.notificationToUserRepo.updateNotificationToUser(
        body as NotificationToUser
      )
      res.json({
        data: result
      })
    } catch (error) {
      console.log(error)
      res.status(error)
    }
  }
}

export default NotificationToUserController
