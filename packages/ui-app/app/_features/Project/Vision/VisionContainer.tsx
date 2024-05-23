import VisionList from './VisionList'
import VisionListTask from './VisionListTask'
import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import VisionCalendarContainer from './VisionCalendaContainer'
import VisionTimeline from '../VisionTimeline'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

export default function VisionContainer({ visible }: { visible: boolean }) {
  const { updateTaskData } = useServiceTaskUpdate()
  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    if (!source || !destination) return
    if (source.droppableId === 'all-column') return

    const sourceIndex = source.index
    const destIndex = destination.index
    const sourceColId = source.droppableId
    const destColId = destination.droppableId

    // const { active, over } = ev
    // if (!active.id || !over?.id) {
    //   return
    // }
    //
    // const taskId = active.id as string
    // const visionId = over.id as string
    //
    // updateTaskData({
    //   id: taskId,
    //   visionId
    // })
  }

  return (
    <div className={`vision relative ${visible ? '' : 'hidden'}`}>
      <div
        className="flex divide-x dark:divide-gray-700"
        style={{ height: `calc(100vh - 83px)` }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <VisionListTask />
          {/* <VisionList /> */}
          <VisionTimeline visible={true} />
        </DragDropContext>
        {/* <VisionCalendarContainer /> */}
      </div>
    </div>
  )
}
