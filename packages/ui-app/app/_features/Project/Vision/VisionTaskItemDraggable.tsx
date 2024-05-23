import { Draggable } from "react-beautiful-dnd";
import VisionTaskItem2 from "./VisionTaskItem2";

export default function VisionTaskItemDraggable({
  id,
  title,
  index,
  statusId,
}: {
  id: string
  statusId: string
  title: string
  index: number
}) {
  return <Draggable draggableId={id} index={index}>
    {provided => (
      <div
        ref={provided.innerRef}
        className="vision-task-item-draggable">
        <div className="text-sm bg-white border rounded-md shadow-md shadow-indigo-100 dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-900">
          <VisionTaskItem2 id={id} title={title} statusId={statusId} provided={provided} />
        </div>

      </div>
    )}
  </Draggable>
}
