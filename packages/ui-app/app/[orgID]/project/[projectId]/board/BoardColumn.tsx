import { useTaskStore } from '@/store/task'
import { TaskStatus } from '@prisma/client'
import { LoadingItem } from '@shared/ui'
import { Draggable } from 'react-beautiful-dnd'
import BoardColumHeader from './BoardColumnHeader'
import { BoardTaskList } from './BoardTaskList'

interface IBoardColumnProps {
  status: TaskStatus
  statusIndex: number
}
export const BoardColumn = ({ status, statusIndex }: IBoardColumnProps) => {
  const { taskLoading } = useTaskStore()
  return (
    <Draggable draggableId={status.id} index={statusIndex}>
      {provided => (
        <div
          className="board-column-wrapper"
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <div className="board-column">
            <BoardColumHeader status={status} provided={provided} />
            <LoadingItem isLoading={taskLoading} />
            <BoardTaskList groupId={status.id} />
          </div>
        </div>
      )}
    </Draggable>
  )
}
