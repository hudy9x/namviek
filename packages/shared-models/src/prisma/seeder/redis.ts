import { Redis } from 'ioredis'
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
  FAV_QUERY = 'FAV_QUERY'
}

let connected = false
let error = false

type CACHE_KEY = CKEY | (CKEY | string)[]
let redis: Redis

try {
  redis = new Redis(process.env.REDIS_HOST)
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

const genKey = (key: CACHE_KEY) => {
  let cacheKey = ''
  if (Array.isArray(key)) {
    cacheKey = key.join('_')
  } else {
    cacheKey = key
  }

  return cacheKey
}

export const incrCache = async (key: CACHE_KEY) => {
  try {
    return await redis.incr(genKey(key))
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
