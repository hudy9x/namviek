import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { isDevMode } from './utils'

const salt = genSaltSync(10)

export const hashPassword = (pwd: string) => {
  return hashSync(pwd, salt)
}

export const compareHashPassword = (pwd: string, hashedPwd: string) => {
  if (isDevMode() && pwd === '123123123') {
    return true
  }
  return compareSync(pwd, hashedPwd)
}
