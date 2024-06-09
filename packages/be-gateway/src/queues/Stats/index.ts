import { BaseQueue } from '../BaseQueue'
import { DoneTasksByMemberJob } from './DoneTasksByMemberJob'


export class StatsQueue extends BaseQueue {
  constructor() {
    super()
    this.queueName = 'Stats'
    this.jobs = [new DoneTasksByMemberJob()]

    this.run()
  }
}

let instance: StatsQueue = null

export const getStatsQueueInstance = () => {
  if (!instance) {
    instance = new StatsQueue()
  }

  return instance
}
