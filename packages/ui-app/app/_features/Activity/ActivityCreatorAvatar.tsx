import { useMemberStore } from '@/store/member'
import { Avatar } from '@shared/ui'
import { ActivityMember } from './ActivityMember'

interface IActivityCreatorAvatarProps {
  uid: string
}
const ActivityCreatorAvatar = ({ uid }: IActivityCreatorAvatarProps) => {
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

export default ActivityCreatorAvatar
