import { useTaskStore } from '@/store/task'
import CalMonthTask from './CalMonthTask'
import { isEqual } from 'date-fns'
import differenceInDays from 'date-fns/differenceInDays'
import { TaskType } from '@prisma/client'


let index = 0

export default function CalMonthTaskList({ day }: { day: Date }) {
  const { tasks } = useTaskStore()

  const dateClasses: string[] = []
  if (day && differenceInDays(new Date(day), new Date()) < 0) {
    dateClasses.push('overdue-task')
  }

  return (
    <div className='calendar-month-tasks'>
      {tasks.map(task => {
        if (!task.dueDate) return null
        const dueDate = new Date(task.dueDate)

        const d1 = new Date(
          dueDate.getFullYear(),
          dueDate.getMonth(),
          dueDate.getDate()
        )
        const d2 = new Date(day.getFullYear(), day.getMonth(), day.getDate())

        if (!isEqual(d1, d2)) {
          return null
        }

        const h = dueDate.getHours()
        const m = dueDate.getMinutes()
        const time = `${h > 9 ? (h > 12 ? h - 12 : h) : '0' + h}:${m > 9 ? m : '0' + m
          } ${h >= 12 ? 'PM' : 'AM'}`

        return (
          <CalMonthTask
            // link={`${orgName}/project/${projectId}?mode=${mode}&taskId=${task.id}`}
            key={task.id}
            type={task.type || TaskType.TASK}
            time={time}
            index={++index}
            title={task.title}
            id={task.id}
            assigneeId={task.assigneeIds[0]}
            taskStatusId={task.taskStatusId || ''}
            classes={dateClasses}
          />
        )
      })}
    </div>
  )
}
