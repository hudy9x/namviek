import { mdUserFindEmail, mdUserFindFirst } from '@shared/models'
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
    return null
  }
}

export const serviceGetUserByEmail = async (email: string) => {
  try {
    const key = [CKEY.USER, email]
    const cached = await hgetAll(key)

    console.log('get user from cache', cached)

    if (cached) return cached

    const result = await mdUserFindEmail(email)

    console.log('md get user by email', result)

    await hset(key, result)

    return result
  } catch (error) {
    console.log('service get user by id error', error)
    return null
  }
}
