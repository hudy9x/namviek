import { ITimelineItem } from '@shared/ui'
import { useVisionContext } from '../Vision/context'
import { isSameDay } from 'date-fns'
import { HiOutlineFlag } from 'react-icons/hi2'
import { dateFormat } from '@shared/libs'
import MemberAvatar from '@/components/MemberAvatar'
import ProgressBar from '@/components/ProgressBar'
import { ReactNode } from 'react'
import TimelineTitle from './TimelineTitle'

function TimelineItemInfo({
  title,
  start,
  end,
  children,
  restAssignees,
  displayAssignees
}: {
  title: string
  start: Date
  end: Date
  displayAssignees: string[]
  restAssignees: number
  children: ReactNode
}) {
  return <section className="flex items-center gap-4 justify-between">
    <div>
      {children}
      <div className="flex items-center gap-1 text-[11px] text-gray-400">
        <HiOutlineFlag />
        <div>{dateFormat(start, 'MMM dd')}</div>
        <span>-</span>
        <div>{dateFormat(end, 'MMM dd')}</div>
      </div>
    </div>
    <div className="flex items-center -space-x-3">
      {displayAssignees.map(assigneeId => {
        return (
          <MemberAvatar
            noName={true}
            uid={assigneeId}
            key={assigneeId}
          />
        )
      })}

      {restAssignees ? (
        <div className="h-6 w-6 bg-gray-50 rounded-full text-[11px] flex items-center justify-center">
          +3
        </div>
      ) : null}
    </div>
  </section>
}

function TimelineProgress({
  enabled,
  progress,
  total,
  done
}: {
  enabled: boolean,
  progress: number,
  total: number,
  done: number
}) {
  if (!enabled) return null

  return <section className="mt-1 flex items-center gap-2 w-[250px]">
    <ProgressBar
      color={progress === 100 ? 'green' : 'blue'}
      variant="square"
      progress={progress || 0}
    />
    <div className="text-[11px] dark:text-gray-400 space-x-2">
      <span>{total} Total</span>
      <span>{done} Done</span>
    </div>
  </section>
}

export default function TimelineItem({ start, end, id, title }: ITimelineItem) {
  const { getVisionProgress, getVisionData, setSelected, selected } =
    useVisionContext()

  const progress = getVisionProgress(id)
  const visionData = getVisionData(id)
  const assigneeIds = Array.from(new Set(visionData.assigneeIds))

  const displayAssignees = assigneeIds.slice(0, 3)
  const restAssignees = assigneeIds.slice(3).length
  const isSame = isSameDay(start, end)
  const hasTask = visionData.done || visionData.total
  const viewTaskInVision = () => {
    setSelected(selected !== id ? id : '')
  }

  const isSelected = selected === id ? 'outline outline-2 outline-offset-2 outline-green-500' : ''

  return (
    <div
      onClick={viewTaskInVision}
      className={`flex items-center justify-between px-2.5 py-2 rounded-md cursor-pointer ${isSelected}`}>
      <div className={`w-full ${isSame ? 'pl-6' : ''}`}>
        <TimelineItemInfo {...{ title, start, end, displayAssignees, restAssignees }} >
          <TimelineTitle id={id} title={title} />
        </TimelineItemInfo>
        <TimelineProgress enabled={!!hasTask} progress={progress} total={visionData.total} done={visionData.done} />
      </div>
    </div>
  )
  // }}
}
