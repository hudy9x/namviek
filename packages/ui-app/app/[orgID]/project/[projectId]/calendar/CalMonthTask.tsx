import { Task } from '@prisma/client'
import TaskAssignee from '../views/TaskAssignee'
import { Draggable } from 'react-beautiful-dnd'

interface ICalMonthTaskProps {
  task: Task
  index: number
}
export default function CalMonthTask({ task, index }: ICalMonthTaskProps) {
  const { title, id, assigneeIds } = task
  return (
    <Draggable draggableId={task.id} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="calendar-task-item">
          <div className="flex items-center gap-1" title={title}>
            <span className="truncate">{title}</span>
            <TaskAssignee noName={true} taskId={id} uids={assigneeIds} />
          </div>
        </div>
      )}
    </Draggable>
  )
}
