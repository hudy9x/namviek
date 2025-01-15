import { Avatar } from '@shared/ui'
import { useMemberStore } from '../../store/member'
import { useMemo } from 'react'

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


  const user = useMemo(() => {
    if (members.length && uid) {
      const matchedUser = members.find(m => m.id === uid)
      return matchedUser
    } else {

      return null
    }
  }, [JSON.stringify(members), uid])

  if (!user) {
    return (
      <div className="flex gap-2 items-center shrink-0">
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
