import { genSaltSync, hashSync } from 'bcryptjs'
import { pmClient } from "../../lib/_prisma"
import { UserStatus } from '@prisma/client'

const salt = genSaltSync(10)
const defaultPwd = process.env.DEFAULT_PWD

export const hashPassword = (pwd: string) => {
  return hashSync(pwd, salt)
}

export const createAdminUser = (value?: string) => {
  return pmClient.user.create({
    data: {
      name: "Administrator",
      email: value || "admin@gmail.com",
      password: hashPassword(defaultPwd || '123123123'),
      status: UserStatus.ACTIVE,
      country: null,
      bio: null,
      dob: null,
      photo: null,
      settings: {},
      createdAt: new Date(),
      createdBy: null,
      updatedAt: null,
      updatedBy: null
    }
  })
}

export const getOrgOwner = (email: string) => {
  return pmClient.user.findFirst({
    where: {
      email
    }
  })
}
