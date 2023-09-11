import { useProjectStatusStore } from '@/store/status'
import { Droppable } from 'react-beautiful-dnd'
import { BoardColumn } from './BoardColumn'

export const BoardColumnList = () => {
  const { statuses } = useProjectStatusStore()

  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {provided => (
        <div
          className="flex divide-x divide-gray-200 dark:divide-gray-700"
          {...provided.droppableProps}
          ref={provided.innerRef}>
          {statuses.map((status, statusIndex) => (
            <BoardColumn
              status={status}
              statusIndex={statusIndex}
              key={status.id}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
