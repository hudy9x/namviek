import Calendar from '@/components/Calendar'
import { VisionField, useVisionContext } from './context'
import VisionListInDate from './VisionListInDate'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import Droppable from '@/components/Dnd/Droppable'

import { isDateEqual } from '@shared/libs'

export default function VisionCalendar() {
  const { visions, updateVision } = useVisionContext()
  const date = new Date()

  const visionByDays: { [key: string]: VisionField[] } = {}

  visions.forEach(vision => {
    const d = vision.dueDate
    if (!d) return
    const key = `${d.getDate()}-${d.getMonth()}`
    if (!visionByDays[key]) {
      visionByDays[key] = []
    }

    visionByDays[key].push(vision)
  })

  const onDragEnd = (ev: DragEndEvent) => {
    const { active, over } = ev
    if (!active.id || !over?.id) {
      return
    }

    const visionId = active.id
    const date = new Date(over.id)

    const vision = visions.find(v => v.id === visionId)

    if (!vision || !vision.dueDate) return

    if (isDateEqual(vision.dueDate, date)) {
      return
    }

    updateVision({
      id: vision.id,
      dueDate: date
    })
  }

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="vision-calendar p-3 w-full">
        <Calendar date={date}>
          {day => {
            const key = `${day.getDate()}-${day.getMonth()}`
            const visionList = visionByDays[key]

            return (
              <Droppable
                className="h-[110px]"
                droppableId={[
                  day.getFullYear(),
                  day.getMonth() + 1,
                  day.getDate()
                ].join('-')}>
                {visionList && <VisionListInDate visions={visionList} />}
              </Droppable>
            )
          }}
        </Calendar>
      </div>
    </DndContext>
  )
}
