import { GridCollection } from "@prisma/client"
import { gridCollectionModel } from "./_prisma"

export class GridCollectionRepository {
  async list(projectId: string) {
    return gridCollectionModel.findMany({
      where: {
        projectId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async create(data: Omit<GridCollection, 'id'>) {
    const collection = await gridCollectionModel.create({
      data
    })

    console.log('create grid collection', collection)

    return collection
  }
} 
