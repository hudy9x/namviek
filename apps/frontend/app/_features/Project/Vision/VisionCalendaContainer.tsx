import { useVisionContext } from './context'
import { DndContext, DragEndEvent } from '@dnd-kit/core'

import { isDateEqual } from '@shared/libs'
import VisionCalendar from './VisionCalendar'

export default function VisionCalendarContainer() {
  const { visions, updateVision, filter } = useVisionContext()
  const { month } = filter
  const d = new Date()
  const y = d.getFullYear()
  const date = new Date(y, month - 1, 1)

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
        <VisionCalendar date={date} />
      </div>
    </DndContext>
  )
}
