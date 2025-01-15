import { FieldSortableJob } from './FieldSortableJob'
import { BaseQueue } from '../BaseQueue'

export class CommonQueue extends BaseQueue {
  constructor() {
    super()
    this.queueName = 'Common'
    this.jobs = [new FieldSortableJob()]

    this.run()
  }
}

let instance: CommonQueue = null

export const getCommonQueueInstance = () => {
  if (!instance) {
    instance = new CommonQueue()
  }

  return instance
}
