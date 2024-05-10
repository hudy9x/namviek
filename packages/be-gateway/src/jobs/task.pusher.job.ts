import { pusherTrigger } from '../lib/pusher-server'

export default class TaskPusherJob {
  async triggerUpdateEvent({
    projectId,
    uid
  }: {
    projectId: string
    uid: string
  }) {
    pusherTrigger('team-collab', `projectTask:update-${projectId}`, {
      triggerBy: uid
    })
  }
}
