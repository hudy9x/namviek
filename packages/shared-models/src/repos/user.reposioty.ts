import { IUserField, UserStatus, castArrToObjectId, castToObjectId, userModel } from '../schema'

export const mdUserFindEmail = async (email: string) => {
  return userModel.findOne({
    email: email
  })
}

export const mdUserFindFirst = async (cond: { id: string }) => {
  const result = await userModel.findOne({
    _id: castToObjectId(cond.id)
  })

  return result.toJSON()
}

export const mdUserAdd = async (data: Omit<IUserField, 'id'>) => {
  return userModel.create(data)
}

export const mdUserFindEmailsByUids = async (uids: string[]) => {
  const result = await userModel.find(
    {
      _id: { $in: castArrToObjectId(uids) },
      status: UserStatus.ACTIVE
    },
    { email: 1, _id: 0 }
  ).lean()

  if (!result || !result.length) return []

  const emails = result.map(r => r.email).filter(Boolean)

  if (!emails.length) return []

  return emails
}

export const mdUserUpdate = async (
  id: string,
  data: Partial<Omit<IUserField, 'id'>>
) => {
  return userModel.updateOne(
    { _id: castToObjectId(id) },
    { $set: data },
    // { new: true } // return update data
  )
}

// export const mdUserUpdateSetting = async (id: string, data: UserSetting) => {
//   const user = await userModel.findOne({ _id: castToObjectId(id) })
//
//   if (!user) return null
//
//   const settings = user.settings as UserSetting
//   return userModel.updateOne(
//     { _id: castToObjectId(id) },
//     { $set: { settings: { ...settings, ...data } } },
//     // { new: true } // return update data
//   )
// }
