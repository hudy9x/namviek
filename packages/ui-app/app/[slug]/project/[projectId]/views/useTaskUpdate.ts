import { useParams } from 'next/navigation'
import { useUser } from '@goalie/nextjs'
import { useTaskStore } from '../../../../../store/task'
import { taskUpdate } from '../../../../../services/task'
import { messageError, messageSuccess, messageWarning } from '@shared/ui'
import { Task } from '@prisma/client'

export const useTaskUpdate = () => {
  const { user } = useUser()
  const { projectId } = useParams()
  const { updateTask } = useTaskStore()

  const updateLocalTask = (taskData: Partial<Task>) => {
    updateTask({
      updatedBy: user?.id,
      ...taskData
    })
  }

  const updateTaskData = (taskData: Partial<Task>) => {
    if (taskData.id?.includes('TASK-ID-RAND')) {
      messageWarning('Wait! this task still syncing data from server')
      return
    }

    updateTask({
      updatedBy: user?.id,
      ...taskData
    })
    taskUpdate({
      projectId,
      ...taskData
    })
      .then(result => {
        const { status } = result
        if (status !== 200) {
          messageError('update error')
          return
        }
        messageSuccess('update success')
        console.log()
        console.log(result)
      })
      .catch(error => {
        console.log(error)
        messageError('update error')
      })
  }
  return {
    updateLocalTask,
    updateTaskData
  }
}
