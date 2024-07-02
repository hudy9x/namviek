import { SubTaskContext } from '@/features/SubTask/context'
import { taskAdd } from '@/services/task'
import { ExtendedTask, useTaskStore } from '@/store/task'
import { useUser } from '@goalie/nextjs'
import { Task, TaskPriority } from '@prisma/client'
import { messageError, messageSuccess } from '@shared/ui'
import { useContext } from 'react'

export const useServiceTaskAdd = () => {
  const { user } = useUser()
  const { setSubTasks } = useContext(SubTaskContext)
  const { addOneTask, syncRemoteTaskById } = useTaskStore()

  const taskCreateOne = (mergedValues: Partial<Task>) => {
    const randomId = `TASK-ID-RAND-${Date.now()}`
    mergedValues.priority = mergedValues.priority || TaskPriority.LOW
    const isCreatingSubTask = mergedValues.parentTaskId

    if (!isCreatingSubTask) {
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

        !isCreatingSubTask && syncRemoteTaskById(randomId, data as Task)
        if (isCreatingSubTask) {
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
