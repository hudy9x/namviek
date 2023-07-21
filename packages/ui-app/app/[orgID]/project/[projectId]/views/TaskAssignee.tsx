import MemberPicker from '../../../../_components/MemberPicker'
import { useTaskUpdate } from './useTaskUpdate'

export default function TaskAssignee({
  taskId,
  uids,
  className
}: {
  taskId: string
  uids: string[]
  className?: string
}) {
  const { updateTaskData } = useTaskUpdate()

  const onUpdate = (assigneeId: string) => {
    const assigneeIds = [assigneeId]
    updateTaskData({
      id: taskId,
      assigneeIds
    })
  }

  return (
    <MemberPicker
      className={`task-assignee ${className}`}
      value={uids[0]}
      onChange={onUpdate}
    />
  )
}
