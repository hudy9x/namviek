import { Task } from '@prisma/client'
import { pusherTrigger } from '../lib/pusher-server'

export default class TaskPusherJob {
  async triggerUpdateEvent({
    projectId,
    uid,
    type = 'update',
    data
  }: {
    projectId: string
    uid: string
    type?: 'delete' | 'update' | 'create' | 'update-many'
    data?: Partial<Task>
  }) {
    console.log('task-pusher-job triggered: ', type)
    pusherTrigger('team-collab', `projectTask:update-${projectId}`, {
      triggerBy: uid,
      type,
      data
    })
  }
}
