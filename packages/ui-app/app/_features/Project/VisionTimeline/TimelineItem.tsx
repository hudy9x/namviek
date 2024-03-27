import { ITimelineItem } from '@shared/ui'
import { useVisionContext } from '../Vision/context'
import { isSameDay } from 'date-fns'
import { HiOutlineFlag } from 'react-icons/hi2'
import { dateFormat } from '@shared/libs'
import MemberAvatar from '@/components/MemberAvatar'
import ProgressBar from '@/components/ProgressBar'
import Droppable from '@/components/Dnd/Droppable'

export default function TimelineItem({ start, end, id, title }: ITimelineItem) {
  const { getVisionProgress, getVisionData, setSelected, selected } =
    useVisionContext()
  // {data => {

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

  return (
    <Droppable droppableId={id} type="vision" className="vision-dropzone">
      <div
        onClick={viewTaskInVision}
        className="flex items-center justify-between">
        <div className={`w-full ${isSame ? 'pl-6' : ''}`}>
          <section className="flex items-center gap-4 justify-between">
            <div>
              <span>{title}</span>
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
          {hasTask ? (
            <section className="mt-1 flex items-center gap-2 w-[250px]">
              <ProgressBar
                color={progress === 100 ? 'green' : 'blue'}
                variant="square"
                progress={progress || 0}
              />
              <div className="text-[11px] dark:text-gray-400 space-x-2">
                <span>{visionData.total} Total</span>
                <span>{visionData.done} Done</span>
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </Droppable>
  )
  // }}
}
