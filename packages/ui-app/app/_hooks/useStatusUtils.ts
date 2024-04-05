import { useProjectStatusStore } from "@/store/status"
import { useTaskStore } from "@/store/task"
import { StatusType } from "@prisma/client"
import { useMemo } from "react"

export const useStatusUtils = () => {

  const { statuses } = useProjectStatusStore()
  const { tasks } = useTaskStore()

  const doneStatus = useMemo(() => {
    const doneIds: string[] = []
    statuses.forEach(stt => {
      if (stt.type === StatusType.DONE) {
        doneIds.push(stt.id)
      }
    })

    return doneIds
  }, [statuses.toString()])


  const isDoneStatus = (statusId: string) => {
    return doneStatus.includes(statusId)
  }

  const getStatusTypeByTaskId = (taskId: string) => {
    const found = tasks.find(t => t.id === taskId)

    if (!found) return StatusType.TODO

    const foundStatus = statuses.find(stt => stt.id === found.taskStatusId)

    if (!foundStatus) return StatusType.TODO

    return foundStatus.type
  }

  return {
    isDoneStatus,
    getStatusTypeByTaskId,
  }
}
