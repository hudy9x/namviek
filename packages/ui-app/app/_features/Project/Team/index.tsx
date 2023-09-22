import TaskFilter from '@/features/TaskFilter'
import { UserMember, useMemberStore } from '@/store/member'
import TeamMember from './TeamMember'
import { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/task'
import { Task } from '@prisma/client'

export interface ITasksMember extends UserMember {
  tasks: Task[]
}

const TeamView = () => {
  const { members } = useMemberStore(state => state)
  const { tasks } = useTaskStore()
  const [tasksMember, setTasksMember] = useState<ITasksMember[]>([])

  useEffect(() => {
    members.map(user => {
      const matchedTasks = tasks.filter(item =>
        item.assigneeIds.includes(user.id)
      )

      setTasksMember(prev => [...prev, { ...user, tasks: matchedTasks }])
    })
  }, [tasks])

  return (
    <>
      <TaskFilter />
      <div className="grid grid-cols-4 gap-6  m-4">
        {tasksMember.map((item, index) => {
          return <TeamMember tasksMember={item} key={item.id} />
        })}
      </div>
    </>
  )
}

export default TeamView
