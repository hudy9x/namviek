import { Activity } from '@prisma/client'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'
import ActivityCardCommentContent from './ActivityCardCommentContent'
import { ActivityCommentData } from '@shared/models'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { ActivityTimeLog } from './ActivityTimeLog'
import ActivityCardCommentReaction from './ActivityCardCommentReaction'
import { useState } from 'react'
import { useActivityContext } from './context'

interface IActivityCardCommentProps {
  activity: Activity
}

export default function ActivityCardComment({
  activity
}: IActivityCardCommentProps) {
  const { uid, data, createdAt, id } = activity as Activity & {
    data: ActivityCommentData
  }
  const { content } = data
  const sourceContent = content || ''
  const [isEditing, setIsEditing] = useState(false)
  const { updateActivity } = useActivityContext()

  const handleEditContent = () => {
    setIsEditing(true)
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

  const handleDiscardContentChange = () => {
    setIsEditing(false)
  }

  return (
    <ActivityCard
      creator={<ActivityMemberAvatar uid={uid} />}
      title={
        <div>
          <ActivityMemberRepresent uid={uid} />
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
              <ActivityCardCommentReaction commentId={id} />
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
