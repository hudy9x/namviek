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

export const mdUserFindEmailsByUids = async (uids: string[]) => {
  const result = await userModel.findMany({
    where: {
      id: { in: uids },
      status: 'ACTIVE'
    },
    select: {
      email: true
    }
  })

  if (!result || !result.length) return []

  const emails = result.map(r => r.email).filter(Boolean)

  if (!emails.length) return []

  return emails
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
