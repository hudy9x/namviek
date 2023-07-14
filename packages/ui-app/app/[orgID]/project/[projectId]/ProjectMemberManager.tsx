import { useOrgMemberGet } from '../../../../services/organizationMember'
import { useMemberStore } from '../../../../store/member'
import Avatar from 'packages/shared-ui/src/components/Avatar'
import { HiOutlineSearch } from 'react-icons/hi'
import ProjectMemberAdd from './ProjectMemberAdd'

export default function ProjectMemberManager() {
  const { members } = useMemberStore()
  useOrgMemberGet()

  return (
    <>
      <div className="setting-container border">
        <div className="rounded-t-lg bg-gray-50 relative">
          <HiOutlineSearch className="absolute top-3.5 left-6 text-gray-500" />
          <input
            className="text-sm bg-transparent pl-14 w-full py-3 border-b "
            placeholder="Search by name or email"
          />
        </div>
        <div className="divide-y">
          {members.map(member => {
            return (
              <div key={member.id} className="px-4 py-3">
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
              </div>
            )
          })}
        </div>
      </div>
      <ProjectMemberAdd />
    </>
  )
}
