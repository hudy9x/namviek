import { useTaskStore } from '@/store/task'
import { useMemo } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import BoardItem from './BoardItem'

export default function BoardItemDraggable({
  item,
  index
}: {
  item: string
  index: number
}) {
  const { tasks } = useTaskStore()
  const task = useMemo(() => {
    return tasks.find(t => t.id === item)
  }, [JSON.stringify(tasks), item])

  if (!task) return null

  return (
    <Draggable draggableId={item} key={item} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="board-item-container"
          key={item}>
          <BoardItem data={task} />
        </div>
      )}
    </Draggable>
  )
}
