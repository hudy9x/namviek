import { useOrgMemberGet } from '../../../../services/organizationMember'
import { useMemberStore } from '../../../../store/member'
import Avatar from 'packages/shared-ui/src/components/Avatar'
import { HiOutlineSearch } from 'react-icons/hi'
import ProjectMemberAdd from './ProjectMemberAdd'
import ProjectMemberRole from './ProjectMemberRole'
import ProjectMemberDel from './ProjectMemberDel'
import { useState } from 'react'

export default function ProjectMemberManager() {
  const { members } = useMemberStore()
  const [term, setTerm] = useState('')
  useOrgMemberGet()

  return (
    <>
      <div className="setting-container border dark:border-gray-700">
        <div className="rounded-t-lg bg-gray-50 dark:bg-gray-800 relative">
          <HiOutlineSearch className="absolute top-3.5 left-6 text-gray-500" />
          <input
            className="text-sm bg-transparent pl-14 w-full py-3 border-b dark:border-gray-800 "
            placeholder="Search by name or email"
            onChange={ev => {
              const value = ev.target.value
              setTerm(value)
            }}
          />
        </div>
        <div className="divide-y dark:divide-gray-800">
          {members.map(member => {
            if (!member.email.includes(term) && !member.name?.includes(term))
              return null

            return (
              <div key={member.id} className="relative px-4 py-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={member.photo || ''}
                    name={member.name || ''}
                    size="lg"
                  />
                  <div className="flex flex-col text-sm">
                    <span className="text-gray-700 font-medium">
                      {member.name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {member.email}
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 right-4 flex items-center gap-3">
                  <ProjectMemberRole uid={member.id} role={member.role} />
                  <ProjectMemberDel uid={member.id} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <ProjectMemberAdd />
    </>
  )
}
