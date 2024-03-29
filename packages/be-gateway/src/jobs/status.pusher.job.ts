import { pusherServer } from '../lib/pusher-server'

export default class StatusPusherJob {
  async triggerUpdateEvent({
    projectId,
    uid
  }: {
    projectId: string
    uid: string
  }) {
    pusherServer.trigger('team-collab', `projectStatus:update-${projectId}`, {
      triggerBy: uid
    })
  }
}
