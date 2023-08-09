import { taskUpdate } from '@/services/task'
import { useTaskStore } from '@/store/task'
import { messageError, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import { useRef } from 'react'
import { DropResult } from 'react-beautiful-dnd'

export const useBoardAction = () => {
  const { updateTask } = useTaskStore()
  const { projectId } = useParams()
  const groupBy = 'status'
  const timeout = useRef<ReturnType<typeof setTimeout>>()

  const onDragEnd = (result: DropResult) => {
    const type = result.type

    if (type === 'column') {
      console.log(result)
    }

    const taskId = result.draggableId
    const destinationId = result.destination?.droppableId

    if (!destinationId) return

    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    // if (groupBy === 'status') {
    //   updateTask({ id: taskId, taskStatusId: destinationId })
    //   timeout.current = setTimeout(() => {
    //     taskUpdate({ id: taskId, taskStatusId: destinationId, projectId }).then(
    //       res => {
    //         const { data, status } = res.data
    //         if (status !== 200) {
    //           messageError('Can not update status')
    //           return
    //         }
    //
    //         messageSuccess('Updated')
    //       }
    //     )
    //   }, 300)
    // }
  }

  return {
    onDragEnd
  }
}
