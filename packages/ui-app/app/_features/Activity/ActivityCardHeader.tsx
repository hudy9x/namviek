import { useMemberStore } from '@/store/member'
import { PropsWithChildren } from 'react'
import { ActivityMember } from './ActivityMemberRepresent'

interface IActivityCardHeaderProps {
  uid: string
}

const ActivityCardHeader = ({
  uid,
  children
}: PropsWithChildren<IActivityCardHeaderProps>) => {
  // const { members } = useMemberStore()
  // const author = members.find(member => member.id === uid)
  return (
    <div className="card-header">
      <ActivityMember uid={uid} />
      {children}
    </div>
  )
}

export default ActivityCardHeader
