import { useTaskFilter } from '@/features/TaskFilter/context'
import './style.css'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'

import { useBoardDndAction } from './useBoardDndAction'
import BoardColumnDraggable from './BoardColumnDraggable'
import { triggerEventTaskReorder } from '@/events/useEventTaskReorder'
import { useUrl } from '@/hooks/useUrl'
import { useBoardRealtimeUpdate } from './useBoardRealtimeUpdate'
import { triggerEventMoveTaskToOtherBoard } from '@/events/useEventMoveTaskToOtherBoard'

export default function BoardContainer() {
  const { projectId } = useUrl()
  const { groupByItems } = useTaskFilter()
  const {
    dragColumnToAnotherPosition,
    dragItemToAnotherPosition,
    dragItemToAnotherColumn
  } = useBoardDndAction()

  useBoardRealtimeUpdate()

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    if (!source || !destination) return
    if (source.droppableId === 'all-column') return

    const sourceIndex = source.index
    const destIndex = destination.index
    const sourceColId = source.droppableId
    const destColId = destination.droppableId

    if (type === 'column') {
      dragColumnToAnotherPosition({
        sourceIndex,
        destIndex
      })
      return
    }

    // reorder task
    if (sourceColId === destColId) {
      // realtime update to another users in project
      triggerEventTaskReorder({
        projectId,
        sourceIndex,
        destIndex,
        sourceColId
      })

      // just update item position on board view
      dragItemToAnotherPosition({
        sourceIndex,
        destIndex,
        sourceColId
      })
    }

    if (sourceColId !== destColId) {
      triggerEventMoveTaskToOtherBoard({
        projectId,
        sourceColId,
        destColId,
        sourceIndex,
        destIndex
      })
      dragItemToAnotherColumn({
        sourceColId,
        destColId,
        sourceIndex,
        destIndex
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => {
          return (
            <div
              className="board-container overflow-y-auto custom-scrollbar"
              style={{ width: 'calc(100vw - 309px)' }}
              {...provided.droppableProps}
              ref={provided.innerRef}>
              {groupByItems.map((group, groupIndex) => {
                return (
                  <BoardColumnDraggable
                    group={group}
                    groupIndex={groupIndex}
                    key={group.id}
                  />
                )
              })}
              {/* <div className="board"> */}
              {/*   <h2 className="btn" onClick={addNewStatus}> */}
              {/*     Create new status */}
              {/*   </h2> */}
              {/* </div> */}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}
