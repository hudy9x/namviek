import { UserMember } from '@/store/member'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { StatusType, Task } from '@prisma/client'
import { useEffect, useMemo, useState } from 'react'
import TeamMemberInfo from './TeamMemberInfo'
import TeamMemberProcess from './TeamMemberProcess'
import TeamMemberStatus from './TeamMemberStatus'
import { TaskStatus } from '@prisma/client'

export interface IStatusTask extends TaskStatus {
  tasks: Task[]
}

const TeamMember = ({ user }: { user: UserMember }) => {
  const { tasks } = useTaskStore()
  const { statuses } = useProjectStatusStore()

  const [tasksMember, setTasksMember] = useState<Task[]>([])

  const statusTaskByMember = useMemo(() => {
    return statuses.map(status => {
      const groupTaskStatus = tasksMember.filter(
        task => task.taskStatusId === status.id
      )

      return {
        ...status,
        tasks: groupTaskStatus
      }
    })
  }, [statuses, tasks, tasksMember])

  useEffect(() => {
    const matchedTasks = tasks.filter(item =>
      item.assigneeIds.includes(user.id)
    )
    if (matchedTasks.length) setTasksMember(matchedTasks)
  }, [tasks, user])

  return (
    <div className="border shadow-sm bg-white rounded-xl p-4 w-[260px] flex flex-col gap-4">
      <TeamMemberInfo name={user?.name} photo={user?.photo} />
      <TeamMemberProcess tasks={tasksMember} statusTasks={statusTaskByMember} />
      <TeamMemberStatus tasks={tasksMember} statusTasks={statusTaskByMember} />
    </div>
  )
}

export default TeamMember
