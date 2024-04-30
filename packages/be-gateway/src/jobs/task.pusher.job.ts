import { pusherServer } from '../lib/pusher-server'

export default class TaskPusherJob {
  async triggerUpdateEvent({
    projectId,
    uid
  }: {
    projectId: string
    uid: string
  }) {
    pusherServer.trigger('team-collab', `projectTask:update-${projectId}`, {
      triggerBy: uid
    })
  }
}
