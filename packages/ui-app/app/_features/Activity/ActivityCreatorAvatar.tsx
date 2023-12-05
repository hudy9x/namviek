import { useMemberStore } from '@/store/member'
import { Avatar } from '@shared/ui'
import { ActivityMember } from './ActivityMember'

interface IActivityCreatorAvatarProps {
  udpatedBy: string
}
const ActivityCreatorAvatar = ({ udpatedBy }: IActivityCreatorAvatarProps) => {
  const { members } = useMemberStore()
  const author = members.find(member => member.id === udpatedBy)

  const { photo, name } = author || {}

  return (
    <div className="activity-card">
      <Avatar src={photo || ''} name={name || ''} size="md" />
      <div className="activity-title">
        <ActivityMember udpatedBy={udpatedBy} />
      </div>
    </div>
  )
}

export default ActivityCreatorAvatar
