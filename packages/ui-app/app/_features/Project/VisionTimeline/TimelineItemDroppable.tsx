import { ReactNode } from "react";
import { Droppable } from "react-beautiful-dnd";

export default function TimelineItemDroppable({ id, children }: { id: string, children: ReactNode }) {
  return <Droppable droppableId={id} type="vision">
    {provided => (
      <div
        className="vision-dropzone"
        ref={provided.innerRef}
        {...provided.droppableProps}>
        {children}
      </div>)}
  </Droppable>
}
