
import { Droppable, Draggable } from "react-beautiful-dnd"
import BoardItem from "./BoardItem"

export default function BoardList({ items, groupId }: { items: string[], groupId: string }) {
  console.log(items)
  return (
    <Droppable droppableId={groupId} type="task">
      {provided => <div className="board-list"
        ref={provided.innerRef}
        {...provided.droppableProps}>
        {items.map((item, itemIndex) => {
          return (
            <BoardItem item={item} key={item} index={itemIndex} />
          )
        })}
        {provided.placeholder}
      </div>}
    </Droppable>
  )
}
