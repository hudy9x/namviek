import { Draggable } from 'react-beautiful-dnd'
import { Task } from '@prisma/client'
import TaskAssignee from '../views/TaskAssignee'
import TaskDate from '../views/TaskDate'
import { useParams, useRouter } from 'next/navigation'
import TaskCheckbox from '@/components/TaskCheckbox'
import { ExtendedTask } from '@/store/task'
// import TaskPriorityCell from '../views/TaskPriorityCell'

interface IBoardTaskItem {
  data: ExtendedTask
  index: number
}

export const BoardTaskItem = ({ data, index }: IBoardTaskItem) => {
  const { orgID, projectId } = useParams()
  const { replace } = useRouter()

  return (
    <Draggable draggableId={data.id} index={index}>
      {provided => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="board-task-item">
            {data.cover ? (
              <div
                onClick={() =>
                  replace(
                    `${orgID}/project/${projectId}?mode=board&taskId=${data.id}`
                  )
                }
                className="max-h-60 -mx-3 bg-gray-50 -mt-3 mb-2 rounded-t-md overflow-hidden">
                <img className="" src={data.cover} />
              </div>
            ) : null}
            <h2
              onClick={() =>
                replace(
                  `${orgID}/project/${projectId}?mode=board&taskId=${data.id}`
                )
              }
              className="text-sm dark:text-gray-400 text-gray-600 whitespace-normal hover:underline cursor-pointer flex items-center gap-2">
              <TaskCheckbox id={data.id} selected={data.selected} />
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
