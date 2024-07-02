import TaskTypeSelect from '@/components/TaskTypeSelect'
import { TaskType } from '@prisma/client'
import { useTaskUpdate } from './useTaskUpdate'

export default function TaskTypeCell({
  taskId,
  type
}: {
  taskId: string
  type: TaskType | null
}) {
  const { updateTaskData } = useTaskUpdate()

  return (
    <TaskTypeSelect
      className="task-type-cell"
      width={180}
      onChange={val => {
        updateTaskData({
          id: taskId,
          type: val
        })
      }}
      value={type || TaskType.TASK}
    />
  )
}
