import { useMemberStore } from '@/store/member'

interface IActivityCardCommentMention {
  memberId: string
}

export default function ActivityCardCommentMention({
  memberId
}: IActivityCardCommentMention) {
  const { members } = useMemberStore()
  const member = members.find(({ id }) => id === memberId)
  return (
    <span className="rounded-3xl bg-blue-600 text-white py-1 px-[2px]">
      {member ? `@${member.name}` : 'Unidentified user'}
    </span>
  )
}
