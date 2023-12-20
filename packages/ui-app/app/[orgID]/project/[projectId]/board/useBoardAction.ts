import {
  ETaskFilterGroupByType,
  useTaskFilter
} from '@/features/TaskFilter/context'
import { projectStatusUpdateOrder } from '@/services/status'
import { taskUpdate } from '@/services/task'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { Task, TaskPriority } from '@prisma/client'
import { messageError, messageSuccess, messageWarning } from '@shared/ui'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'

export const useBoardAction = () => {
  const {
    isGroupbyStatus,
    isGroupbyAssignee,
    isGroupbyPriority,
    swapGroupItemOrder
  } = useTaskFilter()
  const { statuses, swapOrder } = useProjectStatusStore()

  const { updateTask } = useTaskStore()
  const { projectId } = useParams()

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
        })
      }, 1500)
    }
  }, [updateSttCounter, statuses])

  const moveTaskToAnotherBoard = (taskId: string, destinationId: string) => {
    if (!destinationId) return

    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    const data: Partial<Task> = {
      id: taskId,
      projectId
    }
    let update = false

    if (isGroupbyAssignee) {
      update = true
      data.assigneeIds = [destinationId]
    }

    if (isGroupbyStatus) {
      update = true
      data.taskStatusId = destinationId
    }

    if (isGroupbyPriority) {
      update = true
      data.priority = destinationId as TaskPriority
    }

    if (update) {
      updateTask(data)
      timeout.current = setTimeout(() => {
        taskUpdate(data).then(res => {
          const { data, status } = res.data
          if (status !== 200) {
            messageError('Can not update status')
            return
          }

          messageSuccess('Updated')
        })
      }, 300)
    }
  }

  const reorderStatus = (sourceId: number, destinationId: number) => {
    swapGroupItemOrder(sourceId, destinationId)
    // NOTE:
    // swapOrder must be ran after the above function
    // otherwise, the UI will be misaligned as swapping the status's order
    setTimeout(() => {
      swapOrder(sourceId, destinationId)
      setUpdateSttCounter(stt => stt + 1)
    }, 200)
  }

  const onDragEnd = (result: DropResult) => {
    const type = result.type

    if (type === 'column' && isGroupbyStatus) {
      const sourceId = result.source.index
      const destId = result.destination?.index

      destId !== undefined && reorderStatus(sourceId, +destId)
    } else {
      console.log('You can only re-arrange status')
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
