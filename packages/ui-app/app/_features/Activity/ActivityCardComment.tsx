import { Activity } from '@prisma/client'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'
import ActivityCardCommentContent from './ActivityCardCommentContent'
import { ActivityCommentData } from '@shared/models'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { ActivityTimeLog } from './ActivityTimeLog'
import { useActivityContext } from './context'
import MemberAvatar from '@/components/MemberAvatar'
import { dateFormat } from '@shared/libs'
import { Tooltip } from '@shared/ui'
import Time from '@/components/Time'

interface IActivityCardCommentProps {
  activity: Activity
}

export default function ActivityCardComment({
  activity
}: IActivityCardCommentProps) {
  const {
    createdBy,
    data,
    createdAt,
    id: activityId
  } = activity as Activity & {
    data: ActivityCommentData
  }
  const { content } = data
  const sourceContent = content || ''
  // const [isEditing, setIsEditing] = useState(false)
  const { updateActivity, deleteActivity } = useActivityContext()
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
    // console.log({ newActivity })
    updateActivity(newActivity)
  }

  const handleDeleteComment = () => {
    const { id } = activity
    deleteActivity(id)
  }

  return (
    <div className="activity-item none">
      <div className="flex items-start gap-2">
        <MemberAvatar uid={createdBy} />
        <div className="mt-0.5">
          <p className="text-sm text-gray-400">
            wrote a comment 👄 -
            <Time date={new Date(createdAt)} />
          </p>
        </div>
      </div>
      <p
        className="activity-comment"
        dangerouslySetInnerHTML={{ __html: content || '' }}></p>
    </div>
  )

  return (
    <ActivityCard
      activityId={activityId}
      creator={<ActivityMemberAvatar createdBy={createdBy} />}
      title={
        <div>
          <ActivityMemberRepresent createdBy={createdBy} />
          {createdAt && (
            <ActivityTimeLog
              time={new Date(createdAt)}
              activityId={activityId}
            />
          )}
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
            onEditEnd={() => setEditingActivityId('')}
          />
          {!isEditing ? (
            <div className="flex items-center text-xs mt-2 mb-3">
              <span
                className="underline cursor-pointer"
                onClick={handleEditContent}>
                Edit
              </span>
              <span>&#x2022;</span>
              <span
                className="underline cursor-pointer"
                onClick={handleDeleteComment}>
                Delete
              </span>
            </div>
          ) : null}
        </div>
      }
    />
  )
}
