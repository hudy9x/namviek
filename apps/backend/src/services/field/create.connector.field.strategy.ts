import { FieldType, Prisma } from "@prisma/client"

export class FieldConnectorStrategy {
  async findDisplayField(targetGridCollectionId: string, tx: Prisma.TransactionClient) {
    // First try to find text-like fields
    const targetFields = await tx.field.findMany({
      where: {
        gridCollectionId: targetGridCollectionId,
        type: {
          in: [FieldType.TEXT, FieldType.EMAIL, FieldType.URL] // Text-like fields
        }
      },
      orderBy: {
        order: 'asc'
      }
    })

    // If no text fields found, get any field
    if (!targetFields.length) {
      const anyField = await tx.field.findFirst({
        where: {
          gridCollectionId: targetGridCollectionId
        },
        orderBy: {
          order: 'asc'
        }
      })
      return anyField
    }

    return targetFields[0]
  }

  async prepareConfig(config: Prisma.JsonObject, tx: Prisma.TransactionClient) {
    const targetGridCollectionId = config.targetGridCollectionId as string
    if (!targetGridCollectionId) {
      throw new Error('Target grid collection ID is required for connector field')
    }

    const displayField = await this.findDisplayField(targetGridCollectionId, tx)
    if (!displayField) {
      throw new Error('No suitable display field found in target grid collection')
    }

    return {
      ...config,
      displayFieldId: displayField.id
    }
  }
} 
