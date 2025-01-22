import TaskFilter from '@/features/TaskFilter'
import { UserMember, useMemberStore } from '@/store/member'
import TeamMemberInsight from './TeamMemberInsight'
import { useTaskStore } from '@/store/task'
import { Task } from '@prisma/client'
import './style.css'

export interface ITasksMember extends UserMember {
  tasks: Task[]
}

const TeamView = () => {
  const { members } = useMemberStore(state => state)
  const { tasks } = useTaskStore()

  // grouping task by assignees before rendering insights
  const taskGroupedByMembers = {} as {
    [key: string]: Task[]
  }

  tasks.forEach(task => {
    const keys = task.assigneeIds
    keys.forEach(key => {
      if (!taskGroupedByMembers[key]) {
        taskGroupedByMembers[key] = [task]
        return
      }

      taskGroupedByMembers[key].push(task)
    })
  })

  // display all members in columns not in rows
  const columnLen = 4
  const columns: UserMember[][] = []

  let startCol = 0
  const addToCol = (index: number, m: UserMember) => {
    if (!columns[index]) {
      columns[index] = [m]
    } else {
      columns[index].push(m)
    }
  }

  members.forEach(m => {
    addToCol(startCol, m)

    if (startCol === columnLen - 1) {
      startCol = 0
      return
    }
    startCol++
  })

  return (
    <>
      <TaskFilter />
      <div className="grid grid-cols-4 gap-4 w-[1200px] mx-auto mt-4">
        {columns.map((column, index) => {
          return (
            <div key={index} className="space-y-4">
              {column.map(mem => {
                return (
                  <TeamMemberInsight
                    name={mem.name || ''}
                    datas={taskGroupedByMembers[mem.id] || []}
                    photo={mem.photo || ''}
                    key={mem.id}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default TeamView
