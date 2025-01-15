import { mdProjectGet } from '@shared/models'
import { CKEY, hgetAll, hset } from '../lib/redis'

export const serviceGetProjectById = async (id: string) => {
  const key = [CKEY.PROJECT, id]
  const cached = await hgetAll(key)

  if (cached) return cached

  const result = await mdProjectGet(id)

  await hset(key, result)

  return result
}
