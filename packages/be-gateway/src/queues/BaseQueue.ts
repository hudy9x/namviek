import { Queue, Worker } from 'bullmq'
import { BaseJob } from './BaseJob'
import { redis } from '../lib/redis'

export abstract class BaseQueue {
  queueName: string
  queue: Queue
  worker: Worker
  jobs: BaseJob[]
  jobMap: Map<string, BaseJob>

  addJob<T>(name: string, data: T) {
    return this.queue.add(name, data)
  }

  run() {
    this.jobMapping()
    this.registerQueue()
    this.registerWorkerRunJobs()
    this.watchJobs()
  }

  jobMapping() {
    const jobMap = new Map<string, BaseJob>()
    this.jobs.forEach(j => jobMap.set(j.name, j))

    if (this.jobs.length !== jobMap.size) {
      console.log(this.jobs.map(j => j.name))
      throw new Error('Duplicated job name')
    }

    this.jobMap = jobMap
  }

  registerQueue() {
    this.queue = new Queue(this.queueName, {
      connection: redis
    })
  }

  registerWorkerRunJobs() {
    const jobs = this.jobs
    const queueName = this.queueName
    const allJobNames = jobs.map(j => j.name).join(', ')
    const jobMap = this.jobMap

    this.worker = new Worker(
      queueName,
      async job => {
        const { data, name } = job

        if (jobMap.has(name)) {
          const jobInstance = jobMap.get(name)
          await jobInstance.implement(data)
        } else {
          console.log(`the job ${name} is not matched to: ${allJobNames}`)
        }
      },
      { connection: redis }
    )
  }

  watchJobs() {
    const worker = this.worker
    worker.on('completed', job => {
      console.log(`${job.id} has completed!`)
    })

    worker.on('failed', (job, err) => {
      console.log(`${job.id} has failed with ${err.message}`)
    })
  }
}
