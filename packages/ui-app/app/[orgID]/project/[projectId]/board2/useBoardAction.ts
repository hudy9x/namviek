import { useTaskFilter } from '@/features/TaskFilter/context'
import { projectStatusUpdateOrder } from '@/services/status'
import { taskUpdate } from '@/services/task'
import { useProjectStatusStore } from '@/store/status'
import { useTaskStore } from '@/store/task'
import { Task, TaskPriority } from '@prisma/client'
import { messageError, messageSuccess } from '@shared/ui'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
// import { useRef } from "react"

export const useBoardAction = () => {
  const { updateTask } = useTaskStore()
  const { isGroupbyStatus, isGroupbyAssignee, isGroupbyPriority } =
    useTaskFilter()
  const { projectId } = useParams()
  const [updateSttCounter, setUpdateSttCounter] = useState(0)
  const { statuses, swapOrder } = useProjectStatusStore()
  // const timeout = useRef(0)

  const rearrangeColumn = (sourceId: number, destinationId: number) => {
    if (!isGroupbyStatus) return
    swapOrder(sourceId, destinationId)
    setUpdateSttCounter(stt => stt + 1)
  }

  const moveTaskToAnotherGroup = (taskId: string, groupId: string) => {
    console.log('move task to another group', taskId, groupId)
    if (!groupId) return

    // if (timeout.current) {
    //   clearTimeout(timeout.current)
    // }

    const data: Partial<Task> = {
      id: taskId,
      projectId
    }
    let update = false

    if (isGroupbyAssignee) {
      update = true
      data.assigneeIds = groupId === 'NONE' ? [] : [groupId]
    }

    if (isGroupbyStatus) {
      update = true
      data.taskStatusId = groupId
    }

    if (isGroupbyPriority) {
      update = true
      data.priority = groupId as TaskPriority
    }

    if (update) {
      updateTask(data)
      // timeout.current = setTimeout(() => {
      taskUpdate(data).then(res => {
        const { data, status } = res.data
        if (status !== 200) {
          messageError('Can not update status')
          return
        }

        messageSuccess('Updated')
      })
      // }, 300) as unknown as number
    }
  }

  useEffect(() => {
    if (updateSttCounter > 0) {
      // if (timeoutStatus.current) clearTimeout(timeoutStatus.current)
      //
      // timeoutStatus.current = setTimeout(() => {
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
      // }, 1500)
    }
  }, [updateSttCounter, statuses])

  return {
    rearrangeColumn,
    moveTaskToAnotherGroup
  }
}
