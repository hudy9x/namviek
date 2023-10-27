import { CKEY } from '../lib/redis'

export const sGetUserById = (id: string) => {
  const key = [CKEY.USER, id]
}
