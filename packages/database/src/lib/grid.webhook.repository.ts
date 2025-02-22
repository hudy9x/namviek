import { GridWebhook, WebhookStatus } from "@prisma/client"
import { pmClient } from "./_prisma"

export class GridWebhookRepository {
  async create(data: Omit<GridWebhook, 'id'>) {
    return pmClient.gridWebhook.create({
      data
    })
  }

  async findById(id: string) {
    return pmClient.gridWebhook.findUnique({
      where: { id }
    })
  }

  async findByGridCollectionId(gridCollectionId: string) {
    return pmClient.gridWebhook.findMany({
      where: { gridCollectionId }
    })
  }

  async update(id: string, data: Partial<GridWebhook>) {
    return pmClient.gridWebhook.update({
      where: { id },
      data
    })
  }

  async delete(id: string) {
    return pmClient.gridWebhook.delete({
      where: { id }
    })
  }
} 