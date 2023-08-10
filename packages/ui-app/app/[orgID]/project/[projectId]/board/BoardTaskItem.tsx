import { Draggable } from 'react-beautiful-dnd'
import { Task } from '@prisma/client'
import TaskAssignee from '../views/TaskAssignee'
import TaskDate from '../views/TaskDate'
import { format } from 'date-fns'

interface IBoardTaskItem {
  data: Task
  index: number
}

export const BoardTaskItem = ({ data, index }: IBoardTaskItem) => {
  try {
    data.dueDate && format(data.dueDate, 'PP')
  } catch (error) {
    console.log(data.dueDate)
    console.log(error)
  }
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
            </h2>

            <div>
              {/* <TaskDate date={data.dueDate} taskId={data.id} /> */}
              <TaskAssignee taskId={data.id} uids={data.assigneeIds} />
            </div>

            {/* <BoardBodyTitle title={task.title || ''} /> */}
            {/* <BoardActionAssignee */}
            {/*   taskId={task.id} */}
            {/*   uids={task.assigneeIds} */}
            {/* /> */}
          </div>
        )
      }}
    </Draggable>
  )
}
