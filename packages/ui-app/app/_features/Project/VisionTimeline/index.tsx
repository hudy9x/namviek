import './style.css'
import { useVisionContext } from '../Vision/context'
import VisionViewMode from '../Vision/VisionViewMode'

import { Loading, Timeline } from '@shared/ui'
import VisionMonthNavigator from '../Vision/VisionMonthNavigator'

export default function VisionTimeline({ visible }: { visible: boolean }) {
  const { visions, filter, loading, getVisionProgress, updateVision } =
    useVisionContext()

  const ed = new Date()

  return (
    <div
      className={`vision-timeline-container mx-auto relative ${
        visible ? '' : 'hidden'
      }`}
      style={{ maxWidth: `calc(100vw - 340px)` }}>
      <Loading.Absolute enabled={loading} border/>
      <div className="py-3 flex items-center justify-between">
        <div>
          <VisionMonthNavigator />
        </div>
        <VisionViewMode />
      </div>

      <Timeline
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
          const progress = getVisionProgress(data.id)

          return (
            <div className="">
              {data.title}
              <div
                className="absolute bottom-0 left-0 h-1 bg-red-200"
                style={{ width: `${progress}%` }}></div>
            </div>
          )
        }}
      </Timeline>
    </div>
  )
}
