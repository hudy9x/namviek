import { Favorites } from '@prisma/client'
import { favModel } from './_prisma'

export const mdFavAdd = (data: Omit<Favorites, 'id'>) => {
  return favModel.create({
    data
  })
}

export const mdFavGet = (uid: string, orgId: string) => {
  return favModel.findMany({
    where: {
      uid,
      orgId
    }
  })
}

export const mdFavDel = (id: string, uid: string) => {
  return favModel.delete({
    where: {
      id,
      uid
    }
  })
}

export const mdFavUpdate = (id: string, data: Partial<Favorites>) => {
  return favModel.update({
    where: {
      id
    },
    data: data
  })
}
