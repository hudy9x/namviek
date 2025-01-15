import { taskAdd } from '@/services/task'
import { useTaskStore } from '@/store/task'
import { useUser } from '@goalie/nextjs'
import { Task, TaskPriority } from '@prisma/client'
import { messageError, messageSuccess } from '@shared/ui'

export const useServiceTaskAdd = () => {
  const { user } = useUser()
  const { addOneTask, syncRemoteTaskById } = useTaskStore()

  const taskCreateOne = (mergedValues: Partial<Task>) => {
    const randomId = `TASK-ID-RAND-${Date.now()}`
    mergedValues.priority = mergedValues.priority || TaskPriority.LOW

    addOneTask({
      ...mergedValues,
      ...{
        createdAt: new Date(),
        createdBy: user?.id,
        id: randomId
      }
    })

    taskAdd(mergedValues)
      .then(res => {
        const { data, status } = res.data
        if (status !== 200) return

        syncRemoteTaskById(randomId, data as Task)
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
