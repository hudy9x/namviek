import { useTaskStore } from '@/store/task'
import { Droppable } from 'react-beautiful-dnd'
import { BoardTaskItem } from './BoardTaskItem'
import Scrollbar from 'packages/shared-ui/src/components/Scrollbar'
import { BoardActionCreateTask } from './BoardActionCreateTask'
import Link from 'next/link'
import { useParams } from 'next/navigation'

let counter = 0
interface IBoardTaskListProps {
  groupId: string
}
export const BoardTaskList = ({ groupId }: IBoardTaskListProps) => {
  const { tasks } = useTaskStore()
  const { orgID, projectId } = useParams()

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
                  <Link href={`${orgID}/project/${projectId}?mode=board&taskId=${task.id}`}>
                    <BoardTaskItem index={counter} data={task} key={index} />
                  </Link>
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
