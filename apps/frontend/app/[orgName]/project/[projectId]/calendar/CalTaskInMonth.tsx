import MemberAvatar from '@/components/MemberAvatar'
import TaskTypeIcon from '@/components/TaskTypeSelect/Icon'
import { TaskType } from '@prisma/client'

export default function CalTaskInMonth({
  color,
  time,
  title,
  type,
  assigneeId
}: {
  color: string
  time: string
  type: TaskType
  title: string
  assigneeId: string
}) {
  return (
    <div className="px-2 pt-1 pb-2">
      <div
        className="absolute left-0 top-0 h-full w-[4px]"
        style={{ backgroundColor: color }}></div>
      <div className="flex items-center justify-between gap-1" title={title}>
        <h2 className="truncate dark:text-gray-400 space-x-1">
          <TaskTypeIcon size="sm" type={type || ''} />
          <span>{title}</span>
        </h2>
        <MemberAvatar noName={true} uid={assigneeId} />
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500">{time}</div>
    </div>
  )
}
