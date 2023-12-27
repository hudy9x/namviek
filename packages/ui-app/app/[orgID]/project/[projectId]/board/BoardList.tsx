import { Droppable } from 'react-beautiful-dnd'

import BoardItemDraggable from './BoardItemDraggable'
import { BoardActionCreateTask } from './BoardActionCreateTask'

export default function BoardList({
  items,
  groupId
}: {
  items: string[]
  groupId: string
}) {
  return (
    <Droppable droppableId={groupId} type="task">
      {provided => (
        <div
          className="board-list"
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {items.map((item, itemIndex) => {
            return (
              <BoardItemDraggable item={item} key={item} index={itemIndex} />
            )
          })}

          <div className="mx-3">
            <BoardActionCreateTask groupId={groupId} />
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
