import TaskTypeSelect from '@/components/TaskTypeSelect'
import { TaskType } from '@prisma/client'
import { useTaskUpdate } from './useTaskUpdate'

export default function TaskTypeCell({
  taskId,
  type,
  parentTaskId,
}: {
  taskId: string
  type: TaskType | null
  parentTaskId?: string | null
}) {
  const { updateTaskData } = useTaskUpdate()

  return (
    <TaskTypeSelect
      className="task-type-cell"
      width={180}
      onChange={val => {
        updateTaskData({
          id: taskId,
          type: val,
          parentTaskId,
        })
      }}
      value={type || TaskType.TASK}
    />
  )
}
