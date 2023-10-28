import { mdUserFindFirst } from '@shared/models'
import { CKEY, hgetAll, hset } from '../lib/redis'

export const serviceGetUserById = async (id: string) => {
  try {
    const key = [CKEY.USER, id]
    const cached = await hgetAll(key)

    if (cached) return cached

    const result = await mdUserFindFirst({ id })

    await hset(key, result)

    return result
  } catch (error) {
    console.log('service get user by id error', error)
    return {}
  }
}
