import { GridWebhookRepository } from '@database'
import { GridWebhook, WebhookStatus } from '@prisma/client'

export class WebhookService {
  private repository: GridWebhookRepository

  constructor() {
    this.repository = new GridWebhookRepository()
  }

  async create(data: {
    gridCollectionId: string
    url: string
    secret: string
    events: string[]
    createdBy: string
  }) {
    return this.repository.create({
      ...data,
      status: WebhookStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
      updatedBy: data.createdBy
    })
  }

  async getByGridCollection(gridCollectionId: string) {
    return this.repository.findByGridCollectionId(gridCollectionId)
  }

  async update(id: string, data: Partial<GridWebhook>) {
    return this.repository.update(id, {
      ...data,
      updatedAt: new Date()
    })
  }

  async delete(id: string) {
    return this.repository.delete(id)
  }
} 