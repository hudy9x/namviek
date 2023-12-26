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

export default function BoardContainer() {
  const { groupByItems, setGroupbyItems } = useTaskFilter()
  const { dragColumnToAnotherPosition, dragItemToAnotherPosition, dragItemToAnotherColumn } =
    useBoardDndAction()

  console.log('render group by item', JSON.stringify(groupByItems))

  const addNewStatus = () => {
    console.log('a')

    setGroupbyItems(prev => {
      return [
        ...prev,
        {
          id: new Date().getMilliseconds().toString(),
          name: 'New Status ' + new Date(),
          items: []
        }
      ]
    })
  }

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
                  <Draggable
                    key={group.id}
                    draggableId={group.id}
                    index={groupIndex}>
                    {provided => {
                      return (
                        <div
                          className="board"
                          ref={provided.innerRef}
                          {...provided.draggableProps}>
                          <div
                            className="board-header"
                            {...provided.dragHandleProps}>
                            <h2>{group.name}</h2>
                          </div>
                          <BoardList items={group.items} groupId={group.id} />
                        </div>
                      )
                    }}
                  </Draggable>
                )
              })}
              <div className="board">
                <h2 className="btn" onClick={addNewStatus}>
                  Create new status
                </h2>
              </div>
              {provided.placeholder}
            </div>
          )
        }}
      </Droppable>
    </DragDropContext>
  )
}
