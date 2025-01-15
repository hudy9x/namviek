import { useMemberStore } from '@/store/member'
import { Avatar, Tooltip } from '@shared/ui'
import { HiOutlinePlus } from 'react-icons/hi2'
import ProjectMemberAdd from '../../[orgName]/project/[projectId]/ProjectMemberAdd'

export default function ProjectMemberView() {
  const { members } = useMemberStore()
  const displayed = members.slice(0, 4)

  const rest = members.length - displayed.length
  return (
    <div className="flex items-center">
      {displayed.map(m => {
        return (
          <div key={m.id} className="-ml-2 flex items-center">
            <Avatar size="md" src={m.photo} name={m.name} />
          </div>
        )
      })}
      <ProjectMemberAdd
        triggerBtn={
          <Tooltip title="Add new member">
            <div className="cursor-pointer w-6 h-6 -ml-2 p-1 hover:bg-gray-100 text-[9px] font-normal flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 border ">
              {rest ? `+${rest}` : <HiOutlinePlus />}
            </div>
          </Tooltip>
        }
      />
    </div>
  )
}
