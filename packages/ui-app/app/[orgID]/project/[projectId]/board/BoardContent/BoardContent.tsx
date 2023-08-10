import { useProjectStatusStore } from '@/store/status'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { BoardHeaderContent } from './BoardHeaderContent'
import { BoardBodyContent } from './BoardBodyContent'
import { useBoardAction } from './useBoardAction'
import { MdDragIndicator } from 'react-icons/md'

export const BoardContent = () => {
  const { statuses } = useProjectStatusStore()
  const { onDragEnd } = useBoardAction()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => (
          <div
            className="flex gap-2"
            {...provided.droppableProps}
            ref={provided.innerRef}>

            {statuses.map((status, statusIndex) => (
              <Draggable
                key={status.id}
                draggableId={status.id}
                index={statusIndex}>
                {provided => (
                  <div
                    className="shrink-0 w-[270px]"
                    {...provided.draggableProps}
                    ref={provided.innerRef}>
                    {/* <BoardHeaderContent status={status} /> */}
                    <div className='bg-indigo-50/50 rounded-lg border border-gray-200 p-3'>
                      <div className="py-2">
                        <div className="flex border-2 border-transparent items-center gap-2">
                          <div
                            className="w-4 h-4 text-gray-400"
                            {...provided.dragHandleProps}>
                            <MdDragIndicator />
                          </div>
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: status.color }}></div>
                          <span className="text-sm text-gray-500">
                            {status.name}
                          </span>
                        </div>
                      </div>
                      <BoardBodyContent id={status.id} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
