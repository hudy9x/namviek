import { ETaskFilterGroupByType } from '@/features/TaskFilter/context'
import './style.css'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'

import { useBoardDndAction } from './useBoardDndAction'
import BoardColumnDraggable from './BoardColumnDraggable'
import { triggerEventTaskReorder } from '@/events/useEventTaskReorder'
import { useUrl } from '@/hooks/useUrl'
import { useBoardRealtimeUpdate } from './useBoardRealtimeUpdate'
import { triggerEventMoveTaskToOtherBoard } from '@/events/useEventMoveTaskToOtherBoard'
import useTaskFilterContext from '@/features/TaskFilter/useTaskFilterContext'

export default function BoardContainer() {
  const { projectId } = useUrl()
  const { groupByItems, filter, groupBy } = useTaskFilterContext()
  const {
    dragColumnToAnotherPosition,
    dragItemToAnotherPosition,
    dragItemToAnotherColumn
  } = useBoardDndAction()

  const { statusIds } = filter

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
                if (
                  groupBy === ETaskFilterGroupByType.STATUS &&
                  statusIds.length
                ) {
                  if (
                    !statusIds.includes('ALL') &&
                    !statusIds.includes(group.id)
                  ) {
                    return null
                  }
                }

                return (
                  <BoardColumnDraggable
                    group={group}
                    groupIndex={groupIndex}
                    key={group.id}
                  />
                )
              })}
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}
