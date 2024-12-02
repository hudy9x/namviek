import { User } from '@prisma/client'
import { httpPut } from './_req'


export const userUpdate = (data: Partial<User>) => {
  return httpPut('/api/user', data)
}
