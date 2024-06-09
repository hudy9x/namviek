import { pusherTrigger } from '../lib/pusher-server'

export default class NotificationPusherJob {
  async triggerUpdateEvent({
    uid,
    userIds
  }: {
    uid: string
    userIds: string[]
  }) {
    pusherTrigger('team-collab', `notification:update`, {
      triggerBy: uid,
      targets: userIds
    })
  }
}
