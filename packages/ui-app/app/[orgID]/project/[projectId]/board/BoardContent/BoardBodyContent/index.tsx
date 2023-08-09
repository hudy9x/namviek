import { useTaskStore } from '@/store/task'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { Button, Scrollbar } from '@shared/ui'
import { BoardBodyTitle } from './BoardBodyTitle'
import { BoardActionAssignee } from './BoardBodyAction/BoardActionAssignee'
import { AiOutlinePlus } from 'react-icons/ai'

let counter = 1
export const BoardBodyContent = ({ id }: { id: string }) => {
  const { tasks } = useTaskStore()

  return (
    <Droppable droppableId={id} type="task">
      {(provided, snapshot) => (
        <div
          style={{ height: 'calc(100vh - 83px - 38px - 100px)' }}
          className={`pt-2 space-y-2 rounded-b-md ${snapshot.isDraggingOver ? 'bg-indigo-50' : ''}`}
          {...provided.droppableProps}
          ref={provided.innerRef}>
          {tasks.map((task, index) => {
            if (task.taskStatusId !== id) return null
            return (
              <div key={index}>
                <Draggable draggableId={task.id} index={++counter}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="bg-white p-3 rounded-md shadow-sm border">
                        <h2 className='text-sm text-gray-600'>{task.title}</h2>
                        {/* <BoardBodyTitle title={task.title || ''} /> */}
                        {/* <BoardActionAssignee */}
                        {/*   taskId={task.id} */}
                        {/*   uids={task.assigneeIds} */}
                        {/* /> */}
                      </div>
                    )
                  }}
                </Draggable>
              </div>
            )
          })}
          {provided.placeholder}
        </div>
      )}
      {/* <div className="space-y-2"> */}
      {/*   <Scrollbar */}
      {/*     className="mt-3" */}
      {/*     style={{ height: 'calc(100vh - 83px - 38px - 100px)' }}> */}
      {/*     <div className="space-y-2"> */}
      {/*       {tasks.map((task, index) => { */}
      {/*         if (task.taskStatusId !== statusId) return null */}
      {/*         return ( */}
      {/*           <div */}
      {/*             key={index} */}
      {/*             className="bg-white p-3 rounded-md shadow-sm border"> */}
      {/*             <BoardBodyTitle title={task.title || ''} /> */}
      {/*             <BoardActionAssignee */}
      {/*               taskId={task.id} */}
      {/*               uids={task.assigneeIds} */}
      {/*             /> */}
      {/*           </div> */}
      {/*         ) */}
      {/*       })} */}
      {/*     </div> */}
      {/*   </Scrollbar> */}
      {/*   <div> */}
      {/*     <Button */}
      {/*       title="Create new" */}
      {/*       size="sm" */}
      {/*       block */}
      {/*       leadingIcon={<AiOutlinePlus />} */}
      {/*     /> */}
      {/*   </div> */}
      {/* </div> */}
    </Droppable>
  )
}
