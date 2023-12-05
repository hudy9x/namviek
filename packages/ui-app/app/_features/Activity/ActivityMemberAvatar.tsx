import { useMemberStore } from '@/store/member'
import Avatar from 'packages/shared-ui/src/components/Avatar'

interface IActivityMemberAvatarProps {
  createdBy: string
}
export default function ActivityMemberAvatar({
  createdBy
}: IActivityMemberAvatarProps) {
  const { members } = useMemberStore()
  const member = members.find(member => member.id === createdBy)

  if (!member) {
    return null
  }
  const { photo, name } = member
  return (
    <div className="activity-card-avatar">
      <Avatar src={photo || ''} name={name || 'None'} />
    </div>
  )
}
