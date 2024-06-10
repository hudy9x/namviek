import { BaseQueue } from '../BaseQueue'
import { DoneTasksByMemberJob } from './DoneTasksByMemberJob'
import { UnDoneTasksByProjectJob } from './UnDoneTasksByProjectJob'


export class StatsQueue extends BaseQueue {
  constructor() {
    super()
    this.queueName = 'Stats'
    this.jobs = [new DoneTasksByMemberJob(), new UnDoneTasksByProjectJob()]

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
