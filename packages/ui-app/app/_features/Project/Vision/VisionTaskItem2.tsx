import TaskStatus from 'packages/ui-app/app/[orgID]/project/[projectId]/views/TaskStatus'
import { DraggableProvided } from "react-beautiful-dnd";

export default function VisionTaskItem2({
  id,
  title,
  statusId,
  provided
}: {
  id: string
  statusId: string
  title: string
  provided: DraggableProvided
}) {
  return (
    <div className="flex items-center">
      <div className="pl-3 py-2.5">
        <TaskStatus taskId={id} value={statusId} />
      </div>
      <div
        className="line-clamp-2 w-full px-3 py-2.5"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        title={title}>
        {title}
      </div>
    </div>
  )
}
