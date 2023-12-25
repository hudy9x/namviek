import { useTaskFilter } from '@/features/TaskFilter/context'
import './style.css'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable
} from 'react-beautiful-dnd'
import BoardList from './BoardList'

export default function ProjectBoard() {
  const { groupByItems } = useTaskFilter()

  const onDragEnd = (result: DropResult) => {
    console.log(result)
  }
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal">
          {provided => {
            return (
              <div
                className="board-container"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {groupByItems.map((group, groupIndex) => {
                  return (
                    <div className="board" key={group.id}>
                      <Draggable draggableId={group.id} index={groupIndex}>
                        {provided => {
                          return (
                            <div className="board" {...provided.draggableProps}>
                              <h2 {...provided.dragHandleProps}>
                                {group.name}
                              </h2>
                              <BoardList items={group.items} />
                            </div>
                          )
                        }}
                      </Draggable>
                    </div>
                  )
                })}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
