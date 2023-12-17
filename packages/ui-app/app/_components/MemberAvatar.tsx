import { Avatar } from '@shared/ui'
import { UserMember, useMemberStore } from '../../store/member'
import { useEffect, useState } from 'react'

export default function MemberAvatar({
  uid,
  size = 'md',
  noName = false
}: {
  uid: string | null
  size?: 'md' | 'lg' | 'sm'
  noName?: boolean
}) {
  const { members } = useMemberStore(state => state)
  const [user, setUser] = useState<UserMember | null>()

  useEffect(() => {
    if (members.length && uid) {
      const matchedUser = members.find(m => m.id === uid)
      setUser(matchedUser)
    } else {
      setUser(null)
    }
  }, [members, uid])

  if (!user) {
    return (
      <div className="flex gap-2 items-center shrink-0 px-2">
        <Avatar name={'None'} size={size} src={''} />{' '}
        {noName ? null : <span className="selected-member-name">{'None'}</span>}
      </div>
    )
  }

  return (
    <div key={user.id} className="flex gap-2 items-center shrink-0 ">
      <Avatar name={user.name || ''} size={size} src={user.photo || ''} />{' '}
      {noName ? null : <span className="selected-member-name">{user.name}</span>}
    </div>
  )
}
