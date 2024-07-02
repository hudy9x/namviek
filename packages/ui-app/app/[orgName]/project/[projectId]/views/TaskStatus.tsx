import StatusSelect from '../../../../_components/StatusSelect'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'

export default function TaskStatus({
  taskId,
  value,
  className,
  withName = false
}: {
  taskId: string
  value: string
  className?: string
  withName?: boolean
}) {
  const { updateTaskData } = useServiceTaskUpdate()
  const classes = ['task-status']

  const onUpdateStatus = (statusId: string) => {
    if (statusId === value) return
    updateTaskData({
      id: taskId,
      taskStatusId: statusId
    })
  }

  withName && classes.push('with-name')
  className && classes.push(className)
  return (
    <StatusSelect
      className={classes.join(' ')}
      value={value}
      onChange={onUpdateStatus}
    />
  )
}
