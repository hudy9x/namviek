import { FileStorage } from '@prisma/client'
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
