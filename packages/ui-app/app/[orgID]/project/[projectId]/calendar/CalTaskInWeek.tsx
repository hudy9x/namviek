import MemberAvatar from "@/components/MemberAvatar";
import { memo } from "react";

function CalTaskInWeek({
  color,
  title,
  assigneeId
}: {
  color: string,
  title: string,
  assigneeId: string
}) {

  return <>
    <div
      className='absolute left-0 top-0 h-full w-[3px]'
      style={{ backgroundColor: color }}></div>
    <div className="flex items-center justify-between gap-1 px-3 py-2" title={title}>
      <span className="dark:text-gray-400">{title}</span>
    </div>
    <div className="px-3 pb-2">
      <MemberAvatar size="sm" noName={true} uid={assigneeId} />
    </div>
  </>
}

export default memo(CalTaskInWeek)
