import './style.css'
import { useVisionContext } from '../Vision/context'

import { Timeline } from '@shared/ui'
import VisionCreate from '../Vision/VisionCreate'
import TimelineItem from './TimelineItem'
import { AnimatePresence, motion } from 'framer-motion'
import { useId } from 'react'

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
      className={`vision-timeline-container w-full px-3 pt-3 relative ${
        visible ? '' : 'hidden'
      }`}>
      {/* <Loading.Absolute enabled={loading} border /> */}

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
          return (
            <AnimateView visible={true}>
              <TimelineItem {...data} />
            </AnimateView>
          )
        }}
      </Timeline>
      <VisionCreate />
    </div>
  )
}
