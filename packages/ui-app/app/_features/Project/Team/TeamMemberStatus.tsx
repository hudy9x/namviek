import { StatusType, Task } from '@prisma/client'
import { IStatusTask } from './TeamMember'
import TeamMemberStatusTask from './TeamMemberStatusTask'

const TeamMemberStatus = ({ statusTasks }: { statusTasks: IStatusTask[] }) => {
  const statusTaskExcludeDone = statusTasks.filter(
    item => item.type !== StatusType.DONE
  )
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
