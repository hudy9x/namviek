import { Task } from '@prisma/client'
import { TStatusTask } from './TeamMember'
import TeamMemberStatusTask from './TeamMemberStatusTask'

const TeamMemberStatus = ({
  statusTasks,
  tasks
}: {
  statusTasks: TStatusTask[]
  tasks: Task[]
}) => {
  const statusTaskExcludeDone = statusTasks.filter(item => item.type !== 'DONE')
  return (
    <>
      {statusTaskExcludeDone.map(item => (
        <TeamMemberStatusTask
          color={item.color}
          name={item.name}
          tasks={item.tasks}
          key={item.id}
        />
      ))}
    </>
  )
}

export default TeamMemberStatus
