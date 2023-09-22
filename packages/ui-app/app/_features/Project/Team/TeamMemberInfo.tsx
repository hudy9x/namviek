import { Avatar } from '@shared/ui'
import React from 'react'

const TeamMemberInfo = ({ name, photo }: { name: string; photo: string }) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar src={photo} name={name} size="lg" />
      <div className="flex flex-col text-sm">
        <span className="text-gray-700 font-medium">{name}</span>
      </div>
    </div>
  )
}

export default TeamMemberInfo
