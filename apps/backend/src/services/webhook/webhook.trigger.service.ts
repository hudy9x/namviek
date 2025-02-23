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

  trigger(gridCollectionId: string, event: string, payload: any) {
    // Use queueMicrotask for better performance and reliability
    queueMicrotask(async () => {
      try {
        const webhooks = await this.repository.findByGridCollectionId(gridCollectionId)
        const relevantWebhooks = webhooks.filter(
          webhook => webhook.status === WebhookStatus.ACTIVE && webhook.events.includes(event)
        )

        // Send webhooks in parallel without waiting
        relevantWebhooks.forEach(webhook => {
          this.sendWebhookRequest(webhook, {
            event,
            gridCollectionId,
            timestamp: new Date().toISOString(),
            data: payload
          }).catch(error => {
            console.error('Webhook delivery failed:', error)
          })
        })
      } catch (error) {
        console.error('Failed to trigger webhooks:', error)
      }
    })
  }
} 