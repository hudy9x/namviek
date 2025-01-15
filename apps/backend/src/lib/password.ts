import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { isDevMode } from './utils'

const salt = genSaltSync(10)
const defaultPwd = process.env.DEFAULT_PWD

export const hashPassword = (pwd: string) => {
  return hashSync(pwd, salt)
}

export const compareHashPassword = (pwd: string, hashedPwd: string) => {
  let valid = false
  if (compareSync(pwd, hashedPwd)) {
    valid = true
  }

  // in development mode, any user can access with their own password and default password
  if (!valid && isDevMode() && defaultPwd && pwd === defaultPwd) {
    valid = true
  }

  return valid
}
