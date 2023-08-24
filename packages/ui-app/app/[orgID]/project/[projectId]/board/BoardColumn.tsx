import { Draggable } from 'react-beautiful-dnd'
import { TaskStatus } from '@prisma/client'
import { BoardTaskList } from './BoardTaskList'
import BoardColumHeader from './BoardColumnHeader'
import { useTaskStore } from '@/store/task'
import { Loading } from '@shared/ui'

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
            {taskLoading ? (
              <div className="text-sm px-3 py-2 text-gray-500 flex items-center gap-3">
                <span className="w-4 h-4">
                  <Loading />
                </span>
                <span>Loading ...</span>
              </div>
            ) : null}
            <BoardTaskList groupId={status.id} />
          </div>
        </div>
      )}
    </Draggable>
  )
}
