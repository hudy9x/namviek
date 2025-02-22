import { GridWebhook } from "@prisma/client"
import { httpGet, httpPost, httpDel } from "./_req"

interface CreateWebhookData {
  gridCollectionId: string
  url: string
  secret: string
  events: string[]
}

interface WebhookResponse {
  status: number
  data: GridWebhook[]
}

export const webhookSv = {
  create(data: CreateWebhookData) {
    return httpPost<WebhookResponse>('/api/grid-webhooks', data)
  },

  getByGridCollection(gridCollectionId: string) {
    return httpGet<WebhookResponse>(`/api/grid-webhooks/${gridCollectionId}`)
  },

  delete(id: string) {
    return httpDel(`/api/grid-webhooks/${id}`)
  }
} 