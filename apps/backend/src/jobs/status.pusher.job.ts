import { pusherTrigger } from '../lib/pusher-server'

export default class StatusPusherJob {
  async triggerUpdateEvent({
    projectId,
    uid
  }: {
    projectId: string
    uid: string
  }) {
    pusherTrigger('team-collab', `projectStatus:update-${projectId}`, {
      triggerBy: uid
    })
  }
}
