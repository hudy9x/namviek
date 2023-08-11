import { Draggable } from 'react-beautiful-dnd'
import { Task } from '@prisma/client'
import TaskAssignee from '../views/TaskAssignee'
import TaskDate from '../views/TaskDate'
// import TaskPriorityCell from '../views/TaskPriorityCell'

interface IBoardTaskItem {
  data: Task
  index: number
}

export const BoardTaskItem = ({ data, index }: IBoardTaskItem) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="board-task-item">
            <h2 className="text-sm text-gray-600 whitespace-normal">
              {data.title}
              {/* <TaskPriorityCell taskId={data.id} value={data.priority} /> */}
            </h2>

            <div className="board-item-action">
              {data.dueDate ? (
                <TaskDate date={new Date(data.dueDate)} taskId={data.id} />
              ) : null}
              <TaskAssignee taskId={data.id} uids={data.assigneeIds} />
            </div>
          </div>
        )
      }}
    </Draggable>
  )
}
