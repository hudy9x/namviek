import TeamMemberInfo from './TeamMemberInfo'
import TeamMemberProcess from './TeamMemberProcess'
import TeamMemberStatus from './TeamMemberStatus'
import { Task } from '@prisma/client'
import { HiOutlineNoSymbol } from 'react-icons/hi2'
interface ITeamMemberInsightProps {
  datas: Task[]
  name: string
  photo: string
}
const TeamMemberInsight = ({ datas, name, photo }: ITeamMemberInsightProps) => {
  return (
    <div className="border shadow-sm bg-gray-50 dark:bg-gray-800 rounded-md dark:border-gray-700">
      <div className="px-4 pt-4 bg-white dark:bg-gray-900 rounded-t-md">
        <TeamMemberInfo name={name} photo={photo} />
        <TeamMemberProcess datas={datas || []} />
      </div>
      <div className="px-4 py-4 border-t dark:border-gray-700">
        {datas.length ? (
          <TeamMemberStatus datas={datas} />
        ) : (
          <div className="text-sm text-gray-600 dark:text-gray-500 flex items-center gap-1">
            <HiOutlineNoSymbol />
            No task found!
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamMemberInsight
