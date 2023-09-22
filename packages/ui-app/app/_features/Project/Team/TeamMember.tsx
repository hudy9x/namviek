import { useProjectStatusStore } from '@/store/status'
import { useMemo } from 'react'
import { ITasksMember } from '.'
import TeamMemberInfo from './TeamMemberInfo'
import TeamMemberProcess from './TeamMemberProcess'
import TeamMemberStatus from './TeamMemberStatus'

const TeamMember = ({ tasksMember }: { tasksMember: ITasksMember }) => {
  const { statuses } = useProjectStatusStore()

  const statusTaskByMember = useMemo(() => {
    return statuses.map(status => {
      const groupTaskStatus = tasksMember.tasks.filter(
        task => task.taskStatusId === status.id
      )

      return {
        ...status,
        tasks: groupTaskStatus
      }
    })
  }, [statuses, tasksMember])

  return (
    <div className="border shadow-sm bg-white rounded-xl p-4 w-[260px] flex flex-col gap-4">
      <TeamMemberInfo
        name={tasksMember?.name || ''}
        photo={tasksMember?.photo || ''}
      />
      <TeamMemberProcess
        total={tasksMember.tasks.length}
        statusTasks={statusTaskByMember}
      />
      <TeamMemberStatus statusTasks={statusTaskByMember} />
    </div>
  )
}

export default TeamMember
