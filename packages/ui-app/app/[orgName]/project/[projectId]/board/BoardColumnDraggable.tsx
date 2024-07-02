import { ITaskFilterGroupbyItem } from '@/features/TaskFilter/context'
import { Draggable } from 'react-beautiful-dnd'
import BoardHeader from './BoardHeader'
import BoardList from './BoardList'

export default function BoardColumnDraggable({
  group,
  groupIndex
}: {
  group: ITaskFilterGroupbyItem
  groupIndex: number
}) {
  return (
    <Draggable draggableId={group.id} index={groupIndex}>
      {provided => {
        return (
          <div
            className="board"
            ref={provided.innerRef}
            {...provided.draggableProps}>
            <BoardHeader
              icon={group.icon}
              name={group.name}
              color={group.color}
              id={group.id}
              total={group.items.length}
              provided={provided}
            />
            <BoardList items={group.items} groupId={group.id} />
          </div>
        )
      }}
    </Draggable>
  )
}
