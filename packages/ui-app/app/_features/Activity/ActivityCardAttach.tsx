import { Activity } from '@prisma/client'
import ActivityCardHeader from './ActivityCardHeader'
import { AttachementActiviity } from '@shared/models'
import ActivityCardAttachContent from './ActivityCardAttachContent'
import ActivityMemberAvatar from './ActivityMemberAvatar'
import ActivityCard from './ActivityCard'

interface IActivityCardAttachProps {
  activity: Activity
}
export default function ActivityCardAttach({
  activity
}: IActivityCardAttachProps) {
  const { uid, data } = activity as Activity & { data: AttachementActiviity }
  const { title } = data

  return (
    <ActivityCard
      creator={<ActivityMemberAvatar uid={uid} />}
      title={<ActivityCardHeader uid={uid}>{title}</ActivityCardHeader>}
      content={<ActivityCardAttachContent data={data} />}
    />
  )
}
