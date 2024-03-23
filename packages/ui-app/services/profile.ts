import { httpPut } from './_reqv2'
import { User } from '@prisma/client'

type Profile = Partial<User>

export const profileUpdate = (profile: Profile) => {
  return httpPut('api/v2/profile', profile)
}
