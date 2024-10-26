import { IFavoritesField, favoritesModel, castToObjectId } from '../schema'

export const mdFavAdd = async (data: Omit<IFavoritesField, 'id'>) => {
  return await favoritesModel.create(data)
}

export const mdFavGet = async (uid: string, orgId: string) => {
  const result = await favoritesModel.find({
    uid: castToObjectId(uid),
    orgId: castToObjectId(orgId)
  }).lean()

  return result 
}

export const mdFavDel = async (id: string, uid: string) => {
  return await favoritesModel.findOneAndDelete({
    _id: castToObjectId(id),
    uid: castToObjectId(uid)
  })
}

export const mdFavUpdate = async (id: string, data: Partial<Omit<IFavoritesField, 'id'>>) => {
  return await favoritesModel.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true }
  )
}
