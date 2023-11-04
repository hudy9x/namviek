import { Activity } from '@prisma/client'
import { ActivityMember } from './ActivityMember'
import ActivityCardCommentContent from './ActivityCardCommentContent'
import { CommentActivity } from '@shared/models'
import ActivityCardHeader from './ActivityCardHeader'

interface IActivityCardCommentProps {
  activity: Activity
}

export default function ActivityCardComment({
  activity
}: IActivityCardCommentProps) {
  const { uid, data } = activity as Activity & { data: CommentActivity }
  const { title } = data
  return (
    <div className="">
      <ActivityMember uid={uid} />
      <ActivityCardHeader uid={uid}>{title}</ActivityCardHeader>
      <ActivityCardCommentContent data={data} />
    </div>
  )
}
