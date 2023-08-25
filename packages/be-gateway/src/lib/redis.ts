import { Redis } from 'ioredis'

const redis = new Redis(process.env.REDIS_HOST)
let connected = false

redis.once('connect', () => {
  connected = true
  console.log('redis connection established')
})

redis.on('error', error => {
  console.log('redis connection error')
  console.log(error)
})

type RedisValue = string | number | Buffer
type RedisJSONValue = {
  [key: string]: unknown
}

export const setCache = (key: string, value: RedisValue) => {
  if (!connected) {
    return
  }
  redis.set(key, value)
}

export const setJSONCache = (
  key: string,
  value: RedisJSONValue | RedisJSONValue[]
) => {
  redis.set(key, JSON.stringify(value))
}

export const getJSONCache = async (key: string) => {
  if (!connected) {
    return null
  }

  const value = await redis.get(key)

  return JSON.parse(value)
}
