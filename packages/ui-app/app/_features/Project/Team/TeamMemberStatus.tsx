import { Task, TaskStatus } from '@prisma/client'
import TeamMemberStatusTask from './TeamMemberStatusTask'
import { useProjectStatusStore } from '@/store/status'

export interface IStatusTask extends TaskStatus {
  tasks: Task[]
}

const TeamMemberStatus = ({ datas }: { datas: Task[] }) => {
  const { statuses } = useProjectStatusStore()
  const groupedByStatus = {} as { [key: string]: Task[] }

  datas.forEach(dt => {
    const key = dt.taskStatusId
    if (!key) return
    if (!groupedByStatus[key]) {
      groupedByStatus[key] = [dt]
      return
    }
    groupedByStatus[key].push(dt)
  })

  return (
    <>
      {statuses.map(item => {
        const tasks = groupedByStatus[item.id]
        return (
          <TeamMemberStatusTask
            color={item.color}
            name={item.name}
            tasks={tasks}
            key={item.id}
          />
        )
      })}
    </>
  )
}

export default TeamMemberStatus
