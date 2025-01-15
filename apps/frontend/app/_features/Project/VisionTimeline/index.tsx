import './style.css'
import { useVisionContext } from '../Vision/context'

import { Timeline } from '@shared/ui'
import VisionCreate from '../Vision/VisionCreate'
import TimelineItem from './TimelineItem'
import { AnimatePresence, motion } from 'framer-motion'
import { useId } from 'react'
import VisionMonthNavigator from '../Vision/VisionMonthNavigator'
import TimelineItemDroppable from './TimelineItemDroppable'
import TimelineTaskFilter from './TimelineTaskFilter'

function AnimateView({
  visible,
  children
}: {
  visible: boolean
  children: React.ReactNode
}) {
  const id = useId()
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default function VisionTimeline({ visible }: { visible: boolean }) {
  const { visions, filter, loading, updateVision } = useVisionContext()
  const ed = new Date()

  return (
    <div
      className={`vision-timeline-container w-full px-3 pt-3 relative ${visible ? '' : 'hidden'
        }`}>
      {/* <Loading.Absolute enabled={loading} border /> */}
      <div className="z-20 relative mb-3 flex items-center gap-2">
        <div className="w-[120px]">
          <VisionMonthNavigator />
        </div>
        <TimelineTaskFilter />
      </div>

      <Timeline
        height="6.5rem"
        month={filter.month}
        year={ed.getFullYear()}
        onChange={({ id, start, end }) => {
          updateVision({
            id,
            startDate: start,
            dueDate: end
          })
        }}
        items={visions.map(vision => {
          return {
            id: vision.id || '',
            start: vision.startDate || new Date(),
            end: vision.dueDate || new Date(),
            title: vision.name
          }
        })}>
        {data => {
          return (
            <TimelineItemDroppable id={data.id}>
              <AnimateView visible={true}>
                <TimelineItem {...data} />
              </AnimateView>
            </TimelineItemDroppable>
          )
        }}
      </Timeline>
      <VisionCreate />
    </div>
  )
}
