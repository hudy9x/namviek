import { useTaskStore } from '@/store/task'
import { Droppable } from 'react-beautiful-dnd'
import { BoardTaskItem } from './BoardTaskItem'
import Scrollbar from 'packages/shared-ui/src/components/Scrollbar'
import { BoardActionCreateTask } from './BoardActionCreateTask'

let counter = 0
interface IBoardTaskListProps {
  groupId: string
}
export const BoardTaskList = ({ groupId }: IBoardTaskListProps) => {
  const { tasks } = useTaskStore()

  return (
    <Droppable droppableId={groupId} type="task">
      {(provided, snapshot) => (
        <div
          className={`border-2 pt-2 ${
            snapshot.isDraggingOver
              ? 'border-dashed bg-blue-50 border-blue-300'
              : 'border-transparent'
          }`}
          {...provided.droppableProps}
          ref={provided.innerRef}>
          <Scrollbar style={{ height: 'calc(100vh - 83px - 38px - 85px)' }}>
            <div className="space-y-3 px-3 pb-[30px]">
              {tasks.map((task, index) => {
                if (task.taskStatusId !== groupId) return null
                ++counter
                return (
                  <BoardTaskItem index={counter} data={task} key={index} />
                )
              })}
              <BoardActionCreateTask groupId={groupId} />
            </div>
          </Scrollbar>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
