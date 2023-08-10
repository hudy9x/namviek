import { projectStatusUpdateOrder } from '@/services/status'
import { taskUpdate } from '@/services/task'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { messageError, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'

export const useBoardAction = () => {
  const { statuses, swapOrder } = useProjectStatusStore()
  const { updateTask } = useTaskStore()
  const { projectId } = useParams()
  const groupBy = 'status'
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const timeoutStatus = useRef<ReturnType<typeof setTimeout>>()

  const [updateSttCounter, setUpdateSttCounter] = useState(0)

  useEffect(() => {
    if (updateSttCounter > 0) {
      if (timeoutStatus.current) clearTimeout(timeoutStatus.current)

      timeoutStatus.current = setTimeout(() => {
        projectStatusUpdateOrder(
          statuses.map(stt => ({ id: stt.id, order: stt.order }))
        ).then(res => {
          const { status, data } = res.data
          if (status !== 200) {
            messageError('Update status order error')
            return
          }
          messageSuccess('Update order successfully')
          console.log('project status updated')
          console.log(res.data)
        })
      }, 1500)
    }
  }, [updateSttCounter, statuses])

  const moveTaskToAnotherBoard = (taskId: string, destinationId: string) => {
    if (!destinationId) return

    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    if (groupBy === 'status') {
      updateTask({ id: taskId, taskStatusId: destinationId })
      timeout.current = setTimeout(() => {
        taskUpdate({ id: taskId, taskStatusId: destinationId, projectId }).then(
          res => {
            const { data, status } = res.data
            if (status !== 200) {
              messageError('Can not update status')
              return
            }

            messageSuccess('Updated')
          }
        )
      }, 300)
    }
  }

  const reorderStatus = (sourceId: number, destinationId: number) => {
    swapOrder(sourceId, destinationId)
    setUpdateSttCounter(stt => stt + 1)
  }

  const onDragEnd = (result: DropResult) => {
    const type = result.type

    if (type === 'column') {
      const sourceId = result.source.index
      const destId = result.destination?.index

      console.log('column', sourceId, destId)

      destId !== undefined && reorderStatus(sourceId, +destId)
      console.log('update column position')
    }

    if (type === 'task') {
      const taskId = result.draggableId
      const destinationId = result.destination?.droppableId

      destinationId && moveTaskToAnotherBoard(taskId, destinationId)
    }
  }

  return {
    onDragEnd
  }
}
