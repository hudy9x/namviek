import { useMemberStore } from '@/store/member'

interface IActivityMember {
  uid: string
}

export function ActivityMember({ uid }: IActivityMember) {
  const { members } = useMemberStore()
  const member = members.find(member => member.id === uid)

  const { name } = member || {}
  return <div>{name || ''}</div>
}
