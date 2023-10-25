import VisionList from './VisionList'
import VisionListTask from './VisionListTask'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import VisionCalendarContainer from './VisionCalendaContainer'

export default function VisionContainer() {
  const { updateTaskData } = useServiceTaskUpdate()
  const onDragEnd = (ev: DragEndEvent) => {
    const { active, over } = ev
    if (!active.id || !over?.id) {
      return
    }

    const taskId = active.id as string
    const visionId = over.id as string

    updateTaskData({
      id: taskId,
      visionId
    })

    console.log(active, over)
  }
  return (
    <div className="vision relative">
      <div
        className="flex divide-x dark:divide-gray-700"
        style={{ height: `calc(100vh - 83px)` }}>
        <DndContext onDragEnd={onDragEnd}>
          <VisionListTask />
          <VisionList />
        </DndContext>
        <VisionCalendarContainer />
      </div>
    </div>
  )
}
