import Redis from "ioredis";

let redis: Redis
let error = false

export const connectSubClient = (cb?: (err: Error | null, redis?: Redis) => void) => {
  try {
    redis = new Redis(process.env.REDIS_HOST)
    redis.once('connect', () => {
      error = false
      console.log('redis subscribe connection established')
      cb && cb(null, redis)
    })

    redis.on('error', err => {
      if (error) return
      console.log('redis subscribe connection error')
      error = true
      cb && cb(err)
      // console.log(error)
    })
  } catch (error) {
    console.log('redis subscribe connection error')
    cb && cb(error)
  }

}

export const watchSubscribe = () => {

  redis.on("message", (channel, message) => {
    console.log(channel, message)
  })
}


export const onPubsubMessage = (channel: string, callback: (err: Error | null, data: string) => void) => {
  console.log(1)
}


export const subscribe = (channel: string, callback: (err: Error | null, data: string) => void) => {
  redis.subscribe(channel, (err, data) => {
    console.log(err)
    if (err) {
      callback(err, '')
      return
    }

    console.log(`subscribed event => ${channel}`, data)
    callback(null, JSON.stringify(data))


  });

}
