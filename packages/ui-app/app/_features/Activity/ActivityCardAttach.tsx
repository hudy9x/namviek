import { Activity } from '@prisma/client'
import { ActivityMember } from './ActivityMember'
import ActivityCardHeader from './ActivityCardHeader'
import { AttachementActiviity } from '@shared/models'
import ActivityCardAttachComment from './ActivityCardAttachContent'

interface IActivityCardAttachProps {
  activity: Activity
}
export default function ActivityCardAttach({
  activity
}: IActivityCardAttachProps) {
  const { uid, data } = activity as Activity & { data: AttachementActiviity }
  const { title } = data

  return (
    <div className="">
      <ActivityMember uid={uid} />
      <ActivityCardHeader uid={uid}>{title}</ActivityCardHeader>
      <ActivityCardAttachComment data={data} />
    </div>
  )
}
