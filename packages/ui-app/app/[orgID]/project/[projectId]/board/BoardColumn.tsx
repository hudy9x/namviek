import { Draggable } from 'react-beautiful-dnd'
import { TaskStatus } from '@prisma/client'
import { BoardTaskList } from './BoardTaskList'
import BoardColumHeader from './BoardColumnHeader'

interface IBoardColumnProps {
  status: TaskStatus
  statusIndex: number
}
export const BoardColumn = ({ status, statusIndex }: IBoardColumnProps) => {
  return (
    <Draggable draggableId={status.id} index={statusIndex}>
      {provided => (
        <div
          className="board-column-wrapper"
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <div className="board-column">
            <BoardColumHeader status={status} provided={provided} />
            <BoardTaskList groupId={status.id} />
          </div>
        </div>
      )}
    </Draggable>
  )
}
