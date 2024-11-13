import { Redis } from 'ioredis'
import crypto from 'crypto'

let connected = false
let error = false

export enum CKEY {
  USER = 'USER',
  PROJECT = 'PROJECT',
  STATUS = 'STATUS',
  // save the list of organization that user is owner or a member of
  USER_ORGS = 'USER_ORGS',
  // save the list of project that user manages it or be a member
  USER_PROJECT = 'USER_PROJECT',
  // project status
  PROJECT_STATUS = 'PROJECT_STATUS',
  PROJECT_MEMBER = 'PROJECT_MEMBER',
  PROJECT_POINT = 'PROJECT_POINT',
  PROJECT_VISION = 'PROJECT_VISION',
  PROJECT_TASK_COUNTER = 'PROJECT_TASK_COUNTER',

  // count the number of undone tasks
  TODO_COUNTER = 'TODO_COUNTER',
  // save the query condition
  TASK_QUERY = 'TASK_QUERY',

  // save user's favorite links
  FAV_QUERY = 'FAV_QUERY',

  ORG_STORAGE_SIZE = 'ORG_STORAGE_SIZE',
  ORG_MAX_STORAGE_SIZE = 'ORG_MAX_STORAGE_SIZE'
}

type CACHE_KEY = CKEY | (CKEY | string)[]

export let redis: Redis

const MIN = 60
const HOUR = 60 * MIN

const DAY = 23 * HOUR

try {
  redis = new Redis(process.env.REDIS_HOST, {
    // required by npm package: bullmq
    maxRetriesPerRequest: null
  })
  redis.once('connect', () => {
    connected = true
    error = false
    console.log('redis connection established')
  })

  redis.on('error', err => {
    if (error) return
    console.log('redis connection error')
    error = true
    // console.log(error)
  })
} catch (error) {
  console.log('redis connection error')
}

type RedisValue = string | number | Buffer
type RedisJSONValue = {
  [key: string]: unknown
}

export const getRedisConnection = () => connected

// export const setCache = (key: string, value: RedisValue) => {
//   if (!connected) {
//     return
//   }
//   redis.set(key, value)
// }
const genKey = (key: CACHE_KEY) => {
  let cacheKey = ''
  if (Array.isArray(key)) {
    cacheKey = key.join('_')
  } else {
    cacheKey = key
  }

  return cacheKey
}

export const genKeyFromSource = (source: { [key: string]: unknown }) => {
  const digest = crypto
    .createHash('sha256')
    .update(JSON.stringify(source), 'utf8')
    .digest()
  return digest.toString('base64')
}

export const setJSONCache = (
  key: CACHE_KEY,
  value: RedisJSONValue | RedisJSONValue[],
  expired?: number
) => {
  if (!connected) {
    return null
  }
  try {
    const cacheKey = genKey(key)
    console.log('cachekey', cacheKey, expired)
    redis.set(cacheKey, JSON.stringify(value))
    redis.expire(cacheKey, expired || DAY)
  } catch (error) {
    console.log('set redis cache error')
  }
}

export const setCacheExpire = (key: CACHE_KEY, expired: number) => {
  const cacheKey = genKey(key)
  redis.expire(cacheKey, expired)
}

export const getJSONCache = async (key: CACHE_KEY) => {
  if (!connected) {
    return null
  }

  try {
    const value = await redis.get(genKey(key))
    const parseValue = JSON.parse(value)

    if (Object.keys(parseValue).length) {
      return parseValue
    }

    return null
  } catch (error) {
    return null
  }
}

export const delCache = async (key: CACHE_KEY) => {
  try {
    if (!connected) {
      return null
    }
    redis.del(genKey(key))
  } catch (error) {
    console.log(`delete redis key {${key}} error`)
  }
}

export const delMultiCache = async (keys: CACHE_KEY[]) => {
  const pipeline = redis.pipeline()

  keys.forEach(k => {
    pipeline.del(genKey(k))
  })

  await pipeline.exec()
}

export const findCache = async (key: CACHE_KEY, abs = false) => {
  try {
    const newKey = genKey(key)
    const asterisk = abs ? '' : '*'
    const results = await redis.keys(newKey + asterisk)
    return results
  } catch (error) {
    console.log('find cache key error', error)
  }
}

export const findCacheByTerm = async (term: string) => {
  try {
    const results = await redis.keys(term)
    return results
  } catch (error) {
    console.log('find cache key error', error)
  }
}

export const findNDelCaches = async (key: CACHE_KEY) => {
  try {
    const keys = await findCache(key)
    if (!keys.length) return

    const pipeline = redis.pipeline()

    keys.forEach(k => {
      pipeline.del(k)
    })

    await pipeline.exec()
  } catch (error) {
    console.log('findNDelCAche error', error)
  }
}

export const hset = async (key: CACHE_KEY, value: { [key: string]: any }) => {
  await redis.hset(genKey(key), value)
}

export const hgetAll = (key: CACHE_KEY) => {
  const obj = redis.hgetall(genKey(key))
  if (!Object.keys(obj).length) {
    return null
  }
  return obj
}

export const hget = (key: CACHE_KEY, fieldName: string) => {
  return redis.hget(genKey(key), fieldName)
}

export const setCache = async (key: CACHE_KEY, value: RedisValue) => {
  try {
    await redis.set(genKey(key), value)
  } catch (error) {
    console.log(error)
  }
}

export const getCache = async (key: CACHE_KEY) => {
  try {
    return await redis.get(genKey(key))
  } catch (error) {
    console.log(error)
  }
}

export const incrCache = async (key: CACHE_KEY) => {
  try {
    return await redis.incr(genKey(key))
  } catch (error) {
    console.log(error)
    return null
  }
}

export const incrByCache = async (key: CACHE_KEY, val: number) => {
  try {
    return await redis.incrby(genKey(key), val)
  } catch (error) {
    console.log(error)
    return null
  }
}

export const decrCache = async (key: CACHE_KEY) => {
  try {
    return await redis.decr(genKey(key))
  } catch (error) {
    console.log(error)
    return null
  }
}

export const decrByCache = async (key: CACHE_KEY, val: number) => {
  try {
    return await redis.decrby(genKey(key), val)
  } catch (error) {
    console.log(error)
    return null
  }
}
