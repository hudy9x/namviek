import { GridCollection, FieldType } from "@prisma/client"
import { gridCollectionModel, pmClient } from "./_prisma"

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
    const collection = await pmClient.$transaction(async (tx) => {
      // Create collection
      const newCollection = await tx.gridCollection.create({
        data
      })

      // Create default "Name" field
      await tx.field.create({
        data: {
          name: 'Name',
          type: FieldType.TEXT,
          gridCollectionId: newCollection.id,
          config: {
            undeletable: true
          },
          width: 200,
          order: 0,
          hidden: false,
          data: {}
        }
      })

      return newCollection
    })

    console.log('create grid collection with default field', collection)
    return collection
  }

  async findById(id: string) {
    return gridCollectionModel.findUnique({
      where: {
        id
      }
    })
  }
} 
