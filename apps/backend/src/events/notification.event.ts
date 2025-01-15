import { mdMemberGetAllByProjectId } from "@shared/models"
import { notifyToWebUsers } from "../lib/buzzer"

export class NotificationEvent {
  type = 'notification'
  async run(data: string) {

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
}
