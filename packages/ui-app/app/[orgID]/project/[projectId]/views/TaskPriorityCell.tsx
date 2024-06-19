import { TaskPriority } from '@prisma/client'
import PrioritySelect from '../../../../_components/PrioritySelect'
import { useTaskUpdate } from './useTaskUpdate'

export default function TaskPriorityCell({
  taskId,
  value,
  className,
  parentTaskId,
}: {
  taskId: string
  value: TaskPriority | null
  className?: string
  parentTaskId?: string | null
}) {
  const { updateTaskData } = useTaskUpdate()

  const onUpdate = (priority: TaskPriority) => {
    updateTaskData({
      id: taskId,
      priority,
      parentTaskId,
      
    })
  }
  return (
    <PrioritySelect
      className={`task-priority ${className}`}
      value={value || 'LOW'}
      onChange={onUpdate}
    />
  )
}
