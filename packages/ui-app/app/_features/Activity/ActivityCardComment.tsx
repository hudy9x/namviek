import { Activity } from '@prisma/client'
import { ActivityMember } from './ActivityMember'
import ActivityCardCommentContent from './ActivityCardCommentContent'
import { CommentActivity } from '@shared/models'
import ActivityCardHeader from './ActivityCardHeader'
import MemberAvatar from '@/components/MemberAvatar'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'

interface IActivityCardCommentProps {
  activity: Activity
}

export default function ActivityCardComment({
  activity
}: IActivityCardCommentProps) {
  const { uid, data } = activity as Activity & { data: CommentActivity }
  console.log({ ActivityCardComment: activity })
  const { title } = data
  return (
    <ActivityCard
      creator={<ActivityMemberAvatar uid={uid} />}
      title={<ActivityCardHeader uid={uid}>{title}</ActivityCardHeader>}
      content={<ActivityCardCommentContent data={data} />}
    />
  )
}
