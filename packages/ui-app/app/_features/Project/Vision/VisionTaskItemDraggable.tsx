import { Draggable } from "react-beautiful-dnd";
import VisionTaskItem from "./VisionTaskItem";
import { DragEvent } from "react";

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

  const onDragStart = (ev: DragEvent<HTMLDivElement>) => {
    ev.dataTransfer.setData("text", id);
  }

  return <div
    draggable={true}
    onDragStart={onDragStart}
    className="text-sm bg-white border rounded-md shadow-md shadow-indigo-100 dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-900">
    <VisionTaskItem id={id} title={title} statusId={statusId} />
  </div>
}
