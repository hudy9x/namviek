import { Droppable } from 'react-beautiful-dnd'

import BoardItemDraggable from './BoardItemDraggable'
import { BoardActionCreateTask } from './BoardActionCreateTask'
import { useTaskStore } from '@/store/task'

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
          className="board-list custom-scrollbar"
          ref={provided.innerRef}
          {...provided.droppableProps}>
          {items.map((item, itemIndex) => {
            return (
              <BoardItemDraggable item={item} key={item} index={itemIndex} />
            )
          })}

          <div className="px-3 pb-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm sticky -bottom-8 z-10">
            <BoardActionCreateTask groupId={groupId} />
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
