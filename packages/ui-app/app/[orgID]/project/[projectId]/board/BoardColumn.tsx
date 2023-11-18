import { Draggable } from 'react-beautiful-dnd'
import { BoardTaskList } from './BoardTaskList'
import BoardColumHeader from './BoardColumnHeader'
import { useTaskStore } from '@/store/task'
import { Loading } from '@shared/ui'
import {
  ITaskFilterGroupbyItem,
  useTaskFilter
} from '@/features/TaskFilter/context'

interface IBoardColumnProps {
  group: ITaskFilterGroupbyItem
  statusIndex: number
}
export const BoardColumn = ({ group, statusIndex }: IBoardColumnProps) => {
  const { taskLoading } = useTaskStore()
  const { groupByLoading } = useTaskFilter()
  return (
    <Draggable draggableId={group.id} index={statusIndex}>
      {provided => (
        <div
          className="board-column-wrapper"
          {...provided.draggableProps}
          ref={provided.innerRef}>
          <div className="board-column">
            <BoardColumHeader
              icon={group.icon}
              name={group.name}
              color={group.color}
              id={group.id}
              provided={provided}
            />
            {taskLoading || groupByLoading ? (
              <Loading title='Loading ...' className='px-3 py-2'/>
            ) : null}
            <BoardTaskList groupId={group.id} />
          </div>
        </div>
      )}
    </Draggable>
  )
}
