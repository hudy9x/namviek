import { Activity } from '@prisma/client'
import { ActivityMemberRepresent } from './ActivityMemberRepresent'
import ActivityCardCommentContent from './ActivityCardCommentContent'
import { ActivityCommentData } from '@shared/models'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'

interface IActivityCardCommentProps {
  activity: Activity
}

export default function ActivityCardComment({
  activity
}: IActivityCardCommentProps) {
  const { uid, data, createdAt } = activity as Activity & {
    data: ActivityCommentData
  }
  const createdTime = createdAt?.toLocaleDateString()
  console.log({ ActivityCardComment: activity })
  const { title } = data
  return (
    <ActivityCard
      creator={<ActivityMemberAvatar uid={uid} />}
      title={
        <span>
          <ActivityMemberRepresent uid={uid} />
          {/* <EditorContent editor={editor} /> */}
          <a>{createdTime}</a>
        </span>
      }
      content={<ActivityCardCommentContent data={data} />}
    />
  )
}
