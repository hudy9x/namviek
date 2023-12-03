import { mdUserFindEmail, mdUserFindFirst } from '@shared/models'
import { CKEY, addToSetCache, decrbyCache, hgetAll, hset, incrByCache } from '../lib/redis'
import { Task, TaskPriority } from '@prisma/client'

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

export const serviceGetUserByEmail = async (email: string) => {
  try {
    const key = [CKEY.USER, email]
    const cached = await hgetAll(key)

    if (cached) return cached

    const result = await mdUserFindEmail(email)

    await hset(key, result)

    return result
  } catch (error) {
    console.log('service get user by id error', error)
    return {}
  }
}

