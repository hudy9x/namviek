import { GridWebhookRepository } from '@database'
import {
  BaseController,
  Controller,
  Post,
  Get,
  Delete,
  Body,
  UseMiddleware,
  Param,
  Req
} from '../../core'
import { authMiddleware } from '../../middlewares'
import { AuthRequest } from '../../types'
import { WebhookService } from '../../services/webhook/webhook.service'

interface CreateWebhookBody {
  gridCollectionId: string
  url: string
  secret: string
  events: string[]
}

@Controller('/grid-webhooks')
@UseMiddleware([authMiddleware])
export default class GridWebhookController extends BaseController {
  name: string
  private webhookService: WebhookService

  constructor() {
    super()
    this.name = 'grid-webhook'
    this.webhookService = new WebhookService()
  }

  @Get('/:gridCollectionId')
  async getWebhooks(@Param() params) {
    try {
      const { gridCollectionId } = params

      if (!gridCollectionId) {
        throw new Error('Grid Collection ID is required')
      }

      const webhooks = await this.webhookService.getByGridCollection(gridCollectionId)
      return webhooks
    } catch (error) {
      console.error('[Get Webhooks] Error:', error)
      throw new Error('Failed to fetch webhooks')
    }
  }

  @Post('/')
  async createWebhook(
    @Req() req: AuthRequest,
    @Body() body: CreateWebhookBody
  ) {
    try {
      const { gridCollectionId, url, secret, events } = body
      const { id: userId } = req.authen

      if (!gridCollectionId || !url || !events.length) {
        throw new Error('Missing required fields')
      }

      const webhook = await this.webhookService.create({
        gridCollectionId,
        url,
        secret,
        events,
        createdBy: userId
      })

      return webhook
    } catch (error) {
      console.error('[Create Webhook] Error:', error)
      throw new Error('Failed to create webhook')
    }
  }

  @Delete('/:id')
  async deleteWebhook(@Param() params) {
    try {
      const { id } = params

      if (!id) {
        throw new Error('Webhook ID is required')
      }

      await this.webhookService.delete(id)
      return { message: 'Webhook deleted successfully' }
    } catch (error) {
      console.error('[Delete Webhook] Error:', error)
      throw new Error('Failed to delete webhook')
    }
  }
} 