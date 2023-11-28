import { TextEditor } from 'packages/shared-ui/src/components/Controls'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { Button } from '@shared/ui'
import { useState } from 'react'
import { Activity, ActivityObjectType, ActivityType } from '@prisma/client'
import { activityCreate } from '@/services/activity'
import { useTaskStore } from '@/store/task'
interface IActivityCommentEditorProps {
  taskId: string
}
export default function ActivityCommentEditor({
  taskId
}: IActivityCommentEditorProps) {
  const [content, setContent] = useState<string>('')

  const { tasks } = useTaskStore()
  const task = tasks.find(t => t.id === taskId)

  const { createdBy } = task || {}
  if (!createdBy) return null

  const handleSaveEvent = () => {
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
  }

  return (
    <ActivityCard
      creator={<ActivityMemberAvatar uid={createdBy} />}
      title={
        <div>
          <TextEditor value={content} onChange={setContent} />
          <Button
            title="Save"
            type="button"
            onClick={() => handleSaveEvent()}
          />
        </div>
      }
    />
  )
}
