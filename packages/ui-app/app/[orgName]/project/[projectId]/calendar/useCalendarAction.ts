import { DropResult } from 'react-beautiful-dnd'
import { useTaskUpdate } from '../views/useTaskUpdate'

export default function useCalendarAction() {
  const { updateTaskData } = useTaskUpdate()
  const onDragEnd = (result: DropResult) => {
    const dropId = result.destination?.droppableId
    const taskId = result.draggableId
    if (!dropId) return

    const newDate = new Date(dropId)
    newDate.setHours(23)

    console.log(dropId)
    console.log(newDate)

    updateTaskData({
      id: taskId,
      dueDate: newDate
    })
  }

  return {
    onDragEnd
  }
}
