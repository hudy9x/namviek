import { Droppable } from 'react-beautiful-dnd'
import { BoardColumn } from './BoardColumn'
import { useTaskFilter } from '@/features/TaskFilter/context'

export const BoardColumnList = () => {
  const { groupByItems } = useTaskFilter()

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <div
          className="flex divide-x divide-gray-200 dark:divide-gray-700"
          {...provided.droppableProps}
          ref={provided.innerRef}>
          {groupByItems.map((group, groupIndex) => (
            <BoardColumn
              group={group}
              statusIndex={groupIndex}
              key={group.id}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
