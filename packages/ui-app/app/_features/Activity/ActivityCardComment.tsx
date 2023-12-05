import { Activity } from '@prisma/client'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'
import ActivityCardCommentContent from './ActivityCardCommentContent'
import { ActivityCommentData } from '@shared/models'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { ActivityTimeLog } from './ActivityTimeLog'
import { useState } from 'react'
import { useActivityContext } from './context'

interface IActivityCardCommentProps {
  activity: Activity
}

export default function ActivityCardComment({
  activity
}: IActivityCardCommentProps) {
  const { createdBy, data, createdAt, id } = activity as Activity & {
    data: ActivityCommentData
  }
  const { content } = data
  const sourceContent = content || ''
  // const [isEditing, setIsEditing] = useState(false)
  const { updateActivity } = useActivityContext()
  const { editingActivityId, setEditingActivityId } = useActivityContext()

  const isEditing = editingActivityId === activity.id
  const handleEditContent = () => {
    setEditingActivityId(activity.id)
  }

  const handleDiscardContentChange = () => {
    setEditingActivityId('')
  }

  const handleUpdateContent = (newContent: string) => {
    const newActivity: typeof activity = {
      ...activity,
      data: {
        ...data,
        content: newContent
      }
    }
    console.log({ newActivity })
    updateActivity(newActivity)
  }

  return (
    <ActivityCard
      creator={<ActivityMemberAvatar createdBy={createdBy} />}
      title={
        <div>
          <ActivityMemberRepresent createdBy={createdBy} />
          {createdAt && <ActivityTimeLog time={new Date(createdAt)} />}
        </div>
      }
      content={
        <div>
          <ActivityCardCommentContent
            content={sourceContent}
            readonly={!isEditing}
            onDiscardContentChange={
              isEditing ? handleDiscardContentChange : undefined
            }
            onSaveContent={isEditing ? handleUpdateContent : undefined}
          />
          {!isEditing ? (
            <div className="flex items-center">
              <span
                className="underline cursor-pointer"
                onClick={handleEditContent}>
                Edit
              </span>
              <span>&#x2022;</span>
              <span className="underline cursor-pointer">Delete</span>
            </div>
          ) : null}
        </div>
      }
    />
  )
}
