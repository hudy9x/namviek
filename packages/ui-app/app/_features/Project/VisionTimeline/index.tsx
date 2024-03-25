import './style.css'
import { useVisionContext } from '../Vision/context'
import VisionViewMode from '../Vision/VisionViewMode'

import { Avatar, Loading, Timeline } from '@shared/ui'
import VisionMonthNavigator from '../Vision/VisionMonthNavigator'
import MemberAvatar from '@/components/MemberAvatar'
import { HiOutlineFlag } from 'react-icons/hi2'
import { dateFormat } from '@shared/libs'
import ProgressBar from '@/components/ProgressBar'
import { isSameDay } from 'date-fns'

export default function VisionTimeline({ visible }: { visible: boolean }) {
  const {
    visions,
    filter,
    loading,
    getVisionProgress,
    getVisionData,
    updateVision
  } = useVisionContext()

  const ed = new Date()

  return (
    <div
      className={`vision-timeline-container w-full px-3 pt-3 relative ${visible ? '' : 'hidden'
        }`}>
      <Loading.Absolute enabled={loading} border />
      {/* <div className="py-3 flex items-center justify-between"> */}
      {/*   <div> */}
      {/*     <VisionMonthNavigator /> */}
      {/*   </div> */}
      {/*   <VisionViewMode /> */}
      {/* </div> */}

      <Timeline
        height="5.75rem"
        month={filter.month}
        onChange={({ id, start, end }) => {
          updateVision({
            id,
            startDate: start,
            dueDate: end
          })
        }}
        year={ed.getFullYear()}
        items={visions.map(vision => {
          return {
            id: vision.id || '',
            start: vision.startDate || new Date(),
            end: vision.dueDate || new Date(),
            title: vision.name
          }
        })}>
        {data => {
          const { start, end } = data
          const progress = getVisionProgress(data.id)
          const visionData = getVisionData(data.id)
          const assigneeIds = Array.from(new Set(visionData.assigneeIds))

          const displayAssignees = assigneeIds.slice(0, 3)
          const restAssignees = assigneeIds.slice(3).length
          const isSame = isSameDay(start, end)
          const hasTask = visionData.done || visionData.total

          return (
            <div className="flex items-center justify-between">
              <div className={`w-full ${isSame ? 'pl-6' : ''}`}>
                <section className="flex items-center justify-between">
                  <div>
                    <span>{data.title}</span>
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
          )
        }}
      </Timeline>
    </div>
  )
}
