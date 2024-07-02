import MemberPicker from '../../../../_components/MemberPicker'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'

export default function TaskAssignee({
  taskId,
  uids,
  className,
  noName = false
}: {
  taskId: string
  uids: string[]
  className?: string
  noName?: boolean
}) {
  const { updateTaskData } = useServiceTaskUpdate()

  const onUpdate = (assigneeId: string) => {
    const assigneeIds = [assigneeId]
    updateTaskData({
      id: taskId,
      assigneeIds
    })
  }

  const classes = ['task-assignee']

  className && classes.push(className)
  noName && classes.push('no-name')

  return (
    <MemberPicker
      className={classes.join(' ')}
      value={uids ? uids[0] : ''}
      onChange={onUpdate}
    />
  )
}
