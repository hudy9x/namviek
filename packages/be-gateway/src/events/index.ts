import { connectSubClient } from '@shared/pubsub'
import { notifyToWebUsers } from '../lib/buzzer'
import {
  mdMemberBelongToProject,
  mdMemberGetAllByProjectId
} from '@shared/models'

export const CHANNEL_SCHEDULER_ACTION_NOTIFY = 'scheduler:action-notify'
export const CHANNEL_SCHEDULER_CREATE = 'scheduler:create'
export const EVENT = {
  SCHEDULER_DELETE: 'scheduler:delete'
}

connectSubClient((err, redis) => {
  if (err) {
    return
  }
  redis.subscribe(CHANNEL_SCHEDULER_ACTION_NOTIFY, (err, count) => {
    console.log('subscribed', CHANNEL_SCHEDULER_ACTION_NOTIFY)
  })

  redis.on('message', async (channel: string, data: string) => {
    if (channel === CHANNEL_SCHEDULER_ACTION_NOTIFY) {
      try {
        const dataObject = JSON.parse(data)
        const { title, content, to, projectId } = dataObject as {
          title: string
          content: string
          to: string[]
          projectId: string
        }

        let members: string[] = to
        if (to && to.includes('ALL') && projectId) {
          const projectMembers = await mdMemberGetAllByProjectId(projectId)
          members = projectMembers.map(m => m.id)
        }

        notifyToWebUsers(members, {
          title: title,
          body: content
        })
      } catch (error) {
        console.log('event index.js', error)
      }
    }
  })
})
