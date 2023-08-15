import { useTaskStore } from '@/store/task'
import CalMonthTask from './CalMonthTask'
import { isEqual } from 'date-fns'

let index = 0

export default function CalMonthTaskList({ day }: { day: Date }) {
  const { tasks } = useTaskStore()
  return (
    <div className="calendar-month-tasks ">
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

        return <CalMonthTask key={task.id} index={++index} task={task} />
      })}
    </div>
  )
}
