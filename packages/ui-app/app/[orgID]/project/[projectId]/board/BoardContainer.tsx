import { useTaskFilter } from '@/features/TaskFilter/context'
import './style.css'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'

import { useBoardDndAction } from './useBoardDndAction'
import BoardColumnDraggable from './BoardColumnDraggable'
import { useEffect } from 'react'
import {
  triggerEventTaskReorder,
  useEventTaskReorder
} from '@/events/useEventTaskReorder'
import { useUrl } from '@/hooks/useUrl'
import { useUser } from '@goalie/nextjs'

export default function BoardContainer() {
  const { projectId } = useUrl()
  const { user } = useUser()
  const { groupByItems, setGroupbyItems } = useTaskFilter()
  const {
    dragColumnToAnotherPosition,
    dragItemToAnotherPosition,
    dragItemToAnotherColumn
  } = useBoardDndAction()

  useEventTaskReorder(data => {
    if (!user || !user.id) return

    const message = data as {
      triggerBy: string
      sourceColId: string
      sourceIndex: number
      destIndex: number
    }

    if (user.id === message.triggerBy) {
      console.log('ignored re order')
      return
    }

    const { sourceIndex, destIndex, sourceColId } = message
    // just update item position on board view
    dragItemToAnotherPosition({
      sourceIndex,
      destIndex,
      sourceColId,
      syncServerDataAsWell: false
    })
    console.log(message, user)
  })

  const onDragEnd = (result: DropResult) => {
    const { source, destination, type } = result

    console.log('-----------------------')

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
              className="board-container"
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
