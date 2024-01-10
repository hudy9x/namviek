import Redis from "ioredis";

let redis: Redis
let error = false

export const connectPubClient = () => {
  try {
    redis = new Redis(process.env.REDIS_HOST)
    redis.once('connect', () => {
      error = false
      console.log('redis publisher connection established')
    })

    redis.on('error', err => {
      if (error) return
      console.log('redis publisher connection error')
      error = true
      // console.log(error)
    })
  } catch (error) {
    console.log('redis publisher connection error')
  }

}


export const publish = (channel: string, message: unknown) => {
  console.log('pubblished channel', channel)
  redis.publish(channel, JSON.stringify(message));
}
