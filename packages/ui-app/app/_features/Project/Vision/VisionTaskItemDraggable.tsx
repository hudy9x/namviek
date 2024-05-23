import { Draggable } from "react-beautiful-dnd";

export default function VisionTaskItemDraggable({
  id,
  index
}: {
  id: string
  index: number
}) {
  return <Draggable draggableId={id} index={index}>
    {provided => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        className="board-item-container">

      </div>
    )}
  </Draggable>
}
