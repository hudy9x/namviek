import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import MultiMemberPicker from "@/components/MultiMemberPicker"
import './TaskAssignee.css'

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

  const onUpdate = (assigneeIds: string[]) => {
    updateTaskData({
      id: taskId,
      assigneeIds
    })
  }

  const classes = ['task-assignee']
  className && classes.push(className)
  noName && classes.push('no-name')

  return (
    <MultiMemberPicker
      compact={true}
      className={classes.join(' ')}
      value={uids}
      onChange={onUpdate}
    />
  )
}
