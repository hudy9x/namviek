import { useMemberStore } from '@/store/member'
import { Activity } from '@prisma/client'
import { Avatar } from '@shared/ui'
import { ActivityMember } from './ActivityMember'

interface IActivityDataType {}

interface IActivityCardProps {
  value: Activity
}
const ActivityCard = ({ value }: IActivityCardProps) => {
  const { uid, data } = value
  const { members } = useMemberStore()
  const author = members.find(member => member.id === uid)

  const { photo, name } = author || {}

  return (
    <div className="activity-card">
      <Avatar src={photo || ''} name={name || ''} size="md" />
      <div className="activity-title">
        <ActivityMember uid={uid} />
      </div>
    </div>
  )
}

export default ActivityCard
