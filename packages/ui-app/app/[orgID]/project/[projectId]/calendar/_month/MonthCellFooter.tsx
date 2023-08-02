import { useEffect, useState } from 'react'
import TaskCreate from '../TaskCreatePopover'

export default function MonthCellFooter({
  date,
  moreTasksNum: showMoreTaskNum,
  onToggleShowHide
}: {
  date: Date
  moreTasksNum: number
  onToggleShowHide: () => void
}) {
  const [moreTasksNum, setMoreTasksNum] = useState<number>(showMoreTaskNum)
  useEffect(() => {
    setMoreTasksNum(showMoreTaskNum)
  }, [showMoreTaskNum])
  return (
    <div className="flex justify-center">
      <div className="w-full cursor-pointer" onClick={onToggleShowHide}>
        {moreTasksNum > 0
          ? `Show less ${moreTasksNum}`
          : moreTasksNum < 0
          ? `Show more  ${-moreTasksNum}`
          : null}
      </div>
      <TaskCreate
        triggerButton={
          <button className="bottom-3 ml-auto invisible group-hover:visible">
            +
          </button>
        }
      />
      <div className="ml-3">{date.getDate()}</div>
    </div>
  )
}
