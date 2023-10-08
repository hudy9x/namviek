import { FileOwnerType, FileStorage } from '@prisma/client'
import { fileStorageModel } from './_prisma'

export const mdStorageAdd = async (data: Omit<FileStorage, 'id'>) => {
  return fileStorageModel.create({
    data
  })
}

export const mdStorageGet = async (ids: string[]) => {
  return fileStorageModel.findMany({
    where: {
      id: { in: ids }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const mdStorageGetOne = async (id: string) => {
  return fileStorageModel.findFirst({
    where: {
      id
    }
  })
}

export const mdStorageDel = async (id: string) => {
  return fileStorageModel.delete({
    where: {
      id
    }
  })
}

export const mdStorageGetByOwner = async (
  ownerId: string,
  ownerType: FileOwnerType
) => {
  return fileStorageModel.findMany({
    where: {
      owner: ownerId,
      ownerType
    }
  })
}

export const mdStorageDelMany = async (ids: string[]) => {
  return fileStorageModel.updateMany({
    where: {
      id: { in: ids }
    },
    data: {
      isDeleted: true
    }
  })
}
