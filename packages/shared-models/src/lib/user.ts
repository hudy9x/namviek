import { User } from '@prisma/client'
import { userModel } from './_prisma'
import { UserSetting } from '../type'

export const mdUserFindEmail = async (email: string) => {
  return userModel.findFirst({
    where: { email }
  })
}

export const mdUserFindFirst = async (cond: { id: string }) => {
  return userModel.findFirst({
    where: cond
  })
}

export const mdUserAdd = async (data: Omit<User, 'id'>) => {
  return userModel.create({
    data: data
  })
}

export const mdUserUpdate = async (
  id: string,
  data: Partial<Omit<User, 'id'>>
) => {
  return userModel.update({
    where: { id },
    data
  })
}

export const mdUserUpdateSetting = async (id: string, data: UserSetting) => {
  const user = await userModel.findFirst({
    where: { id }
  })

  if (!user) return null

  const settings = user.settings as UserSetting
  return userModel.update({
    where: { id },
    data: {
      settings: { ...settings, ...data }
    }
  })
}
