import { memo } from 'react'
import Calendar from '@/components/Calendar'
import VisionListInDate from './VisionListInDate'
import Droppable from '@/components/Dnd/Droppable'

function VisionCalendar({ date }: { date: Date }) {
  return (
    <Calendar date={date}>
      {day => {
        return (
          <Droppable
            className="h-[110px]"
            droppableId={[
              day.getFullYear(),
              day.getMonth() + 1,
              day.getDate()
            ].join('-')}>
            <VisionListInDate date={day} />
          </Droppable>
        )
      }}
    </Calendar>
  )
}

export default memo(VisionCalendar)
