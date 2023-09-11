'use client'

import { useOrgMemberGet } from '@/services/organizationMember'
import { useOrgMemberStore } from '@/store/orgMember'
import { Avatar } from '@shared/ui'
import { MdOutlineRefresh } from 'react-icons/md'
import { useMyworkContext } from './context'
import { AiOutlineCheck } from 'react-icons/ai'

export default function MyWorkMembers() {
  useOrgMemberGet()
  const { orgMembers } = useOrgMemberStore()
  const { setAssigneeIds, assigneeIds } = useMyworkContext()
  const setSelect = (uid: string) => {
    setAssigneeIds(pu => {
      if (pu.find(u => u === uid)) {
        return pu.filter(p => p !== uid)
      }
      return [uid, ...pu]
    })
  }

  return (
    <div className="py-4">
      <h2 className="font-medium flex items-center justify-between gap-2 pb-2">
        <span>🚴‍♀️ Members</span>
        {/* <MdOutlineRefresh className="cursor-pointer w-7 h-7 rounded-md bg-white border p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-50" /> */}
      </h2>
      <div className="mw-members">
        {orgMembers.map(member => {
          const { name, id, photo } = member
          const isSelected = !!assigneeIds.find(uid => uid === id)

          return (
            <div
              key={id}
              onClick={() => setSelect(id)}
              className="mw-member-item">
              <div className="flex items-center gap-2">
                <Avatar size="md" name={name || ''} src={photo || ''} />
                <span className="text-gray-500 text-sm">{name}</span>
              </div>
              {isSelected && (
                <AiOutlineCheck className="w-5 h-5 p-1 text-white rounded-full bg-indigo-500" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
