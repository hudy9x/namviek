import { useTaskFilter } from '@/features/TaskFilter/context'
import './style.css'
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable
} from 'react-beautiful-dnd'
import BoardList from './BoardList'

export default function ProjectBoard() {
  const { groupByItems, setGroupbyItems } = useTaskFilter()

  const addNewStatus = () => {
    console.log('a')

    setGroupbyItems(prev => {
      return [...prev, {
        id: new Date().getMilliseconds().toString(),
        name: 'New Status ' + new Date(),
        items: []

      }]
    })
  }

  const onDragEnd = (result: DropResult) => {


    const { source, destination } = result

    if (!source || !destination) return
    if (source.droppableId === 'all-column') return


    console.log('-----------------------')
    // console.log(source, destination, result)

    const sourceIndex = source.index
    const destIndex = destination.index
    const sourceColId = source.droppableId
    const destColId = destination.droppableId

    if (sourceColId === destColId) {
      setGroupbyItems(prev => {
        const cloned = structuredClone(prev)

        const column = cloned.find(c => c.id === sourceColId)

        if (!column) {

          console.log('empoty column')
          return cloned
        }

        console.log(JSON.stringify(column.items), sourceIndex, destIndex)

        const sourceItem = column.items[sourceIndex]
        column.items[sourceIndex] = column.items[destIndex]
        column.items[destIndex] = sourceItem




        return cloned
      })
    }






  }
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {provided => {
            return (
              <div
                className="board-container"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {groupByItems.map((group, groupIndex) => {
                  return (
                    <Draggable key={group.id} draggableId={group.id} index={groupIndex}>
                      {provided => {
                        return (
                          <div className="board" ref={provided.innerRef} {...provided.draggableProps}>
                            <h2 {...provided.dragHandleProps}>
                              {group.name} - {group.id}
                            </h2>
                            <BoardList items={group.items} groupId={group.id} />
                          </div>
                        )
                      }}
                    </Draggable>
                  )
                })}
                <div className='board'>
                  <h2 className='btn' onClick={addNewStatus}>Create new status</h2>
                </div>
                {provided.placeholder}
              </div>
            )
          }}
        </Droppable>
      </DragDropContext>
    </div>
  )
}
