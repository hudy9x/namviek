import { GridWebhookRepository } from '@database'
import { GridWebhook, WebhookStatus } from '@prisma/client'
import axios from 'axios'
import crypto from 'crypto'

export class WebhookTriggerService {
  private repository: GridWebhookRepository

  constructor() {
    this.repository = new GridWebhookRepository()
  }

  private generateSignature(payload: any, secret: string): string {
    const hmac = crypto.createHmac('sha256', secret)
    hmac.update(JSON.stringify(payload))
    return hmac.digest('hex')
  }

  private async sendWebhookRequest(webhook: GridWebhook, payload: any) {
    const signature = this.generateSignature(payload, webhook.secret)
    
    try {
      await axios.post(webhook.url, payload, {
        headers: {
          'Content-Type': 'application/json',
          'X-Signature': signature,
          'X-Webhook-Id': webhook.id
        }
      })
    } catch (error) {
      console.error(`Failed to send webhook to ${webhook.url}:`, error.message)
    }
  }

  async trigger(gridCollectionId: string, event: string, payload: any) {
    try {
      // Get all active webhooks for this grid collection that are subscribed to this event
      const webhooks = await this.repository.findByGridCollectionId(gridCollectionId)
      const relevantWebhooks = webhooks.filter(
        webhook => webhook.status === WebhookStatus.ACTIVE && webhook.events.includes(event)
      )

      if (!relevantWebhooks.length) {
        console.log(`No active webhooks found for grid collection ${gridCollectionId} and event ${event}`)
        return
      }

      // Send the webhook requests in parallel
      await Promise.all(
        relevantWebhooks.map(webhook => 
          this.sendWebhookRequest(webhook, {
            event,
            gridCollectionId,
            timestamp: new Date().toISOString(),
            data: payload
          })
        )
      )
    } catch (error) {
      console.error('Failed to trigger webhooks:', error)
    }
  }
} 