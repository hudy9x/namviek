import { TaskPriority } from '@prisma/client'
import PrioritySelect from '../../../../_components/PrioritySelect'
import { useTaskUpdate } from './useTaskUpdate'

export default function TaskPriorityCell({
  taskId,
  value,
  className
}: {
  taskId: string
  value: TaskPriority | null
  className?: string
}) {
  const { updateTaskData } = useTaskUpdate()

  const onUpdate = (priority: TaskPriority) => {
    updateTaskData({
      id: taskId,
      priority
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
