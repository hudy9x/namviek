import { taskAdd } from '@/services/task'
import { ExtendedTask, useTaskStore } from '@/store/task'
import { useUser } from '@goalie/nextjs'
import { Task, TaskPriority } from '@prisma/client'
import { messageError, messageSuccess } from '@shared/ui'
import { useContext } from 'react'
import { TaskContext } from '../[orgID]/project/[projectId]/views/ListMode'

export const useServiceTaskAdd = ({ parentTaskId }: {
  parentTaskId?: string
}) => {
  const { user } = useUser()
  const { setSubTasks } = useContext(TaskContext)
  const { addOneTask, syncRemoteTaskById } = useTaskStore()

  const taskCreateOne = (mergedValues: Partial<Task>) => {
    const randomId = `TASK-ID-RAND-${Date.now()}`
    mergedValues.priority = mergedValues.priority || TaskPriority.LOW

    if (!parentTaskId) {
      addOneTask({
        ...mergedValues,
        ...{
          createdAt: new Date(),
          createdBy: user?.id,
          id: randomId
        }
      })
    }

    taskAdd(mergedValues)
      .then(res => {
        const { data, status } = res.data
        if (status !== 200) return

        !parentTaskId && syncRemoteTaskById(randomId, data as Task)
        if (parentTaskId) {
          setSubTasks(prev => [...prev, data])
        }
        messageSuccess('Synced success !')
      })
      .catch(err => {
        messageError('Create new task error')
        console.log(err)
      })
      .finally(() => {
        // setLoading(false)
      })
  }

  return {
    createLocalTask: addOneTask,
    taskCreateOne
  }
}
