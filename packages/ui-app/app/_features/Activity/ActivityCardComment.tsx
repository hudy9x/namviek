import { Activity } from '@prisma/client'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'
import ActivityCardCommentContent from './ActivityCardCommentContent'
import { ActivityCommentData } from '@shared/models'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'
import { ActivityTimeLog } from './ActivityTimeLog'
import ActivityCardCommentReaction from './ActivityCardCommentReaction'

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
          {content ? <ActivityCardCommentContent content={content} /> : null}
          {content ? <ActivityCardCommentReaction commentId={id} /> : null}
        </div>
      }
    />
  )
}
