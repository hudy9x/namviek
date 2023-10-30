import { useParams } from 'next/navigation'
import { useUser } from '@goalie/nextjs'
import { useTaskStore } from '@/store/task'
import { taskUpdate } from '@/services/task'
import { messageError, messageSuccess, messageWarning } from '@shared/ui'
import { Task, TaskPriority } from '@prisma/client'
import { useTaskAutomation } from './useTaskAutomation'
import { ITaskDefaultValues } from '../[orgID]/project/[projectId]/TaskForm'
import { useProjectStatusStore } from '@/store/status'

export const useServiceTaskUpdate = () => {
  const { user } = useUser()
  const { projectId } = useParams()
  const { updateTask } = useTaskStore()
  const { statusDoneId } = useProjectStatusStore()
  const { refactorTaskFieldByAutomationConfig } = useTaskAutomation()

  const updateTaskData = (taskData: Partial<Task>) => {
    if (taskData.id?.includes('TASK-ID-RAND')) {
      messageWarning('Wait! this task still syncing data from server')
      return
    }

    if (!taskData.priority) {
      taskData.priority = TaskPriority.LOW
    }

    if (taskData.taskStatusId) {
      taskData.done = taskData.taskStatusId === statusDoneId
    }

    refactorTaskFieldByAutomationConfig('task', taskData as ITaskDefaultValues)

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
      })
      .catch(error => {
        console.log(error)
        messageError('update error')
      })
  }
  return {
    updateTaskData
  }
}
