import { Activity, ActivityObjectType, ActivityType } from '@prisma/client'
import { activityCreate } from '@/services/activity'
import { useTaskStore } from '@/store/task'
import { useActivityContext } from './context'
import { Form } from '@shared/ui'
import MemberAvatar from '@/components/MemberAvatar'
import { useUser } from '@goalie/nextjs'

export default function ActivityCommentEditor() {
  const { taskId, addActivity } = useActivityContext()
  const { user } = useUser()
  const { tasks } = useTaskStore()
  const task = tasks.find(t => t.id === taskId)

  const { createdBy } = task || {}
  if (!createdBy) return null

  const addNewContent = (content: string) => {
    const newComment: Omit<Activity, 'id'> = {
      type: ActivityType.TASK_COMMENT_CREATED,
      objectId: taskId,
      objectType: ActivityObjectType.TASK,
      createdAt: new Date(),
      createdBy: createdBy,
      updatedAt: null,
      updatedBy: null,
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

  const onEnter = (value: string, target: HTMLTextAreaElement) => {
    console.log(value, target)
    addNewContent(value)
    target.value = ''
  }

  return (
    <div className='flex items-start gap-2 mb-3'>
      <MemberAvatar uid={user?.id || ''} noName={true} />
      <div className='w-full'>
        <Form.Textarea placeholder='Write your comments' onEnter={onEnter} rows={1} />
      </div>
    </div>
  )
}
