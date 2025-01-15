import { mdTaskStatusGetById } from '@shared/models'
import { CKEY, hgetAll, hset } from '../lib/redis'

export const serviceGetStatusById = async (id: string) => {
  const key = [CKEY.STATUS, id]
  const cached = await hgetAll(key)

  if (cached) return cached

  const result = await mdTaskStatusGetById(id)

  await hset(key, result)

  return result
}
