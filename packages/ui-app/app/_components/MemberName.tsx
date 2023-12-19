import { useMemberStore } from '../../store/member'
import { useMemo } from 'react'

export default function MemberName({
  uid,
  className
}: {
  uid: string | null
    className?: string
}) {
  const { members } = useMemberStore(state => state)


  const name = useMemo(() => {
    if (members.length && uid) {
      const matchedUser = members.find(m => m.id === uid)
      return matchedUser?.name || ''
    } else {
      return ''
    }
  }, [members, uid])



  return (
    <span className="member-name text-gray-900">{name || 'None'}</span>
  )
}
