import StatusSelect from '../../../../_components/StatusSelect'
import { useTaskUpdate } from './useTaskUpdate'

export default function TaskStatus({
  taskId,
  value,
  className
}: {
  taskId: string
  value: string
  className?: string
}) {
  const { updateTaskData } = useTaskUpdate()

  const onUpdateStatus = (statusId: string) => {
    updateTaskData({
      id: taskId,
      taskStatusId: statusId
    })
  }
  return (
    <StatusSelect
      className={`task-status ${className}`}
      value={value}
      onChange={onUpdateStatus}
    />
  )
}
