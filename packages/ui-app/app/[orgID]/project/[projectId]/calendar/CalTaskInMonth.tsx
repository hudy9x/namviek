import MemberAvatar from '@/components/MemberAvatar'

export default function CalTaskInMonth({
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
        className="absolute left-0 top-0 h-full w-[3px]"
        style={{ backgroundColor: color }}></div>
      <div className="flex items-center justify-between gap-1" title={title}>
        <span className="truncate dark:text-gray-400">{title}</span>
        <MemberAvatar noName={true} uid={assigneeId} />
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500">{time}</div>
    </>
  )
}
