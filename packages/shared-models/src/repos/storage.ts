// import { FileOwnerType, FileStorage } from '@prisma/client'
// import { fileStorageModel } from './_prisma'
import { fileStorageModel, FileOwnerType, IFileStorageField, castToObjectId } from "../schema";

export const mdStorageAdd = async (data: Omit<IFileStorageField, 'id'>) => {
  return fileStorageModel.create(data)
}

export const mdStorageGet = async (ids: string[]) => {
  return fileStorageModel.find({
    where: {
      _id: { $in: ids.map(castToObjectId) }
    },
    orderBy: { createdAt: 'desc' }
  })
}

export const mdStorageGetOne = async (id: string) => {
  return fileStorageModel.findById(id)
}

export const mdStorageDel = async (id: string) => {
  return fileStorageModel.findByIdAndDelete(id)
}

export const mdStorageGetByOwner = async (
  ownerId: string,
  ownerType: FileOwnerType
) => {
  return fileStorageModel.find({
    owner: ownerId,
    ownerType
  })
}

export const mdStorageDelMany = async (ids: string[]) => {
  return fileStorageModel.updateMany({
    _id: { in: ids.map(castToObjectId) }
  },
    {
      isDeleted: true
    }
  )
}
