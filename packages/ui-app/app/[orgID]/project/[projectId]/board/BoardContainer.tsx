import { useTaskFilter } from '@/features/TaskFilter/context'
import './style.css'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable
} from 'react-beautiful-dnd'
import BoardList from './BoardList'

import { useBoardDndAction } from './useBoardDndAction'
import BoardColumnDraggable from './BoardColumnDraggable'
import { useEffect } from 'react'

export default function BoardContainer() {
  const { groupByItems, setGroupbyItems } = useTaskFilter()
  const {
    dragColumnToAnotherPosition,
    dragItemToAnotherPosition,
    dragItemToAnotherColumn
  } = useBoardDndAction()

  // const addNewStatus = () => {
  //   console.log('a')
  //
  //   setGroupbyItems(prev => {
  //     return [
  //       ...prev,
  //       {
  //         id: new Date().getMilliseconds().toString(),
  //         name: 'New Status ' + new Date(),
  //         items: []
  //       }
  //     ]
  //   })
  // }

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

    if (sourceColId === destColId) {
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
