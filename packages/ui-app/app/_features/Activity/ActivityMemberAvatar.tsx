import { useMemberStore } from '@/store/member'
import Avatar from 'packages/shared-ui/src/components/Avatar'

interface IActivityMemberAvatarProps {
  uid: string
}
export default function ActivityMemberAvatar({
  uid
}: IActivityMemberAvatarProps) {
  const { members } = useMemberStore()
  const member = members.find(member => member.id === uid)

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
