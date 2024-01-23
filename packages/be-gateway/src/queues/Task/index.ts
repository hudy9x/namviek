import { ReorderJob } from './ReorderJob'
import { BaseQueue } from '../BaseQueue'

export class TaskQueue extends BaseQueue {
  constructor() {
    super()
    this.queueName = 'Task'
    this.jobs = [new ReorderJob()]

    this.run()
  }
}

let instance: TaskQueue = null

export const getTaskQueueInstance = () => {
  if (!instance) {
    instance = new TaskQueue()
  }

  return instance
}
