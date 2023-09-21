import { useProjectStatusStore } from '@/store/status'
import { StatusType, Task } from '@prisma/client'
import { Avatar } from '@shared/ui'
import { useMemo } from 'react'
import TeamMemberProcess from './TeamMemberProcess'
import TeamMemberStatus from './TeamMemberStatus'
import { Group } from './useGroupBy'
import TeamMemberInfo from './TeamMemberInfo'

export type TStatusTask = {
  name: string
  tasks: Task[]
  color: string
  type: StatusType
  id: string
}

const TeamMember = ({ item }: { item: Group }) => {
  const { tasks } = item
  const user = item.header.user[0]
  const { statuses } = useProjectStatusStore()

  const statusTaskByMember = useMemo(() => {
    const status = statuses.reduce((prev: TStatusTask[], status) => {
      const exits = prev.find(item => item.id === status.id)
      const idx = tasks.findIndex(item => item.taskStatusId === status.id)
      if (idx === -1) return prev

      if (exits) {
        exits.tasks.push(tasks[idx])
      } else {
        prev.push({
          color: status.color,
          id: status.id,
          name: status.name,
          type: status.type,
          tasks: [tasks[idx]]
        })
      }

      return prev
    }, [])

    return status
  }, [statuses, tasks])

  return (
    <div className="border shadow-sm bg-white rounded-xl p-4 w-[300px] flex flex-col gap-4">
      <TeamMemberInfo name={user?.name} photo={user?.photo} />
      <TeamMemberProcess statusTasks={statusTaskByMember} tasks={tasks} />

      <TeamMemberStatus statusTasks={statusTaskByMember} tasks={tasks} />
    </div>
  )
}

export default TeamMember
