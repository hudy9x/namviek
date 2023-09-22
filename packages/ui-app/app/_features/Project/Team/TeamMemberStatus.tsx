import { Task, TaskStatus } from '@prisma/client'

import TeamMemberStatusTask from './TeamMemberStatusTask'

export interface IStatusTask extends TaskStatus {
  tasks: Task[]
}

const TeamMemberStatus = ({ statusTasks }: { statusTasks: IStatusTask[] }) => {
  return (
    <>
      {statusTasks.map(item => (
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
