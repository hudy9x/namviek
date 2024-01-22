import { Queue, Worker } from 'bullmq'

import { Redis } from 'ioredis'
const redis = new Redis(process.env.REDIS_HOST, {
  maxRetriesPerRequest: null
})

interface IReorderData {
  updatedOrder: [string, string][]
  projectId: string
}

export class TaskReorderQueue {
  queue: Queue
  worker: Worker
  constructor() {
    const name = 'TaskReorder'

    console.log('register queue:', name)
    this.queue = new Queue(name, {
      connection: redis
    })

    console.log('register worker for queu:', name)
    this.worker = new Worker(
      name,
      async job => {
        const data = job.data as IReorderData
        await this.workerHandler(data)
      },
      { connection: redis }
    )
    this.watch()
  }

  addJob(name: string, data: IReorderData) {
    return this.queue.add(name, data)
  }

  async workerHandler(data: IReorderData) {
    console.log(data)
  }

  watch() {
    const worker = this.worker
    worker.on('completed', job => {
      console.log(`${job.id} has completed!`)
    })

    worker.on('failed', (job, err) => {
      console.log(`${job.id} has failed with ${err.message}`)
    })
  }
}

let instance: TaskReorderQueue = null

export const getTaskReorderQueueInstance = () => {
  if (!instance) {
    instance = new TaskReorderQueue()
  }

  return instance
}
