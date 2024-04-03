import MemberAvatar from '@/components/MemberAvatar'
import { memo } from 'react'

function CalTaskInWeek({
  color,
  time,
  title,
  assigneeId
}: {
  color: string
  time: string
  title: string
  assigneeId: string
}) {
  return (
    <>
      <div
        className="absolute left-0 top-0 h-full w-[4px]"
        style={{ backgroundColor: color }}></div>
      <div
        className="flex items-center justify-between gap-1 px-3 pt-2"
        title={title}>
        <span className="dark:text-gray-400">{title}</span>
        <div className="">
          <MemberAvatar noName={true} uid={assigneeId} />
        </div>
      </div>
      <div className="px-3 text-xs text-gray-400 dark:text-gray-500">
        {time}
      </div>
    </>
  )
}

export default memo(CalTaskInWeek)
