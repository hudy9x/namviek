import { Activity, ActivityObjectType, ActivityType } from '@prisma/client'
import { activityCreate } from '@/services/activity'
import { useTaskStore } from '@/store/task'
import { useActivityContext } from './context'
import ActivityCardCommentContent from './ActivityCardCommentContent'

export default function ActivityCommentEditor() {
  const { taskId, addActivity } = useActivityContext()

  const { tasks } = useTaskStore()
  const task = tasks.find(t => t.id === taskId)

  const { createdBy } = task || {}
  if (!createdBy) return null

  const handelAddContent = (content: string) => {
    const newComment: Omit<Activity, 'id'> = {
      type: ActivityType.TASK_COMMENT_CREATED,
      objectId: taskId,
      objectType: ActivityObjectType.TASK,
      createdAt: new Date(),
      uid: createdBy,
      data: {
        content
      }
    }

    activityCreate(taskId, newComment)
      .then(res => {
        const {
          data: { data }
        } = res
        console.log({ addNewComment: data })
        addActivity(data)
      })
      .catch(error => console.log({ addNewCommenterror: error }))
  }

  return (
    <ActivityCardCommentContent content="" onSaveContent={handelAddContent} />
  )
}
