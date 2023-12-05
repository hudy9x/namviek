import { useMemberStore } from '@/store/member'

interface IActivityMember {
  createdBy: string
}

export function ActivityMemberRepresent({ createdBy }: IActivityMember) {
  const { members } = useMemberStore()
  const member = members.find(member => member.id === createdBy)

  const { name } = member || {}
  return <span className="font-bold">{name || ''}</span>
}
