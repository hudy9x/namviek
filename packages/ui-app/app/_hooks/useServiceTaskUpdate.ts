import { useParams } from 'next/navigation'
import { useUser } from '@goalie/nextjs'
import { PartialTask, useTaskStore } from '@/store/task'
import { taskUpdate, taskUpdateMany } from '@/services/task'
import { messageError, messageSuccess, messageWarning } from '@shared/ui'
import { Task, TaskPriority } from '@prisma/client'
import { useTaskAutomation } from './useTaskAutomation'
import { ITaskDefaultValues } from '../[orgID]/project/[projectId]/TaskForm'
import { useProjectStatusStore } from '@/store/status'

export const useServiceTaskUpdate = () => {
  const { user } = useUser()
  const { projectId } = useParams()
  const { updateTask, updateMultipleTask } = useTaskStore()
  const { statusDoneId } = useProjectStatusStore()
  const { refactorTaskFieldByAutomationConfig } = useTaskAutomation()

  const _isRandomId = (id: string) => {
    return id.includes('TASK-ID-RAND')
  }

  const _handleTaskData = (taskData: PartialTask) => {
    const data = structuredClone(taskData)

    if (data.id && _isRandomId(data.id)) {
      messageWarning('Wait! this task still syncing data from server')
      return
    }

    if (!data.priority) {
      data.priority = TaskPriority.LOW
    }

    if (data.taskStatusId) {
      data.done = data.taskStatusId === statusDoneId
    }

    refactorTaskFieldByAutomationConfig('task', data as ITaskDefaultValues)

    return data
  }

  const updateMultiTaskData = (ids: string[], data: Partial<Task>) => {
    if (ids.some(id => _isRandomId(id))) {
      messageWarning('Wait! this task still syncing data from server')
      return
    }

    const handledData = _handleTaskData(data)
    console.log('handledData', handledData)
    const updatedData = {
      progress: handledData?.progress,
      dueDate: handledData?.dueDate,
      taskPoint: handledData?.taskPoint,
      priority: handledData?.priority,
      assigneeIds: handledData?.assigneeIds,
      taskStatusId: handledData?.taskStatusId
    }

    updateMultipleTask({
      updatedBy: user?.id,
      ...updatedData
    })

    taskUpdateMany(ids, { projectId, ...updatedData })
      .then(res => {
        messageSuccess('update success')
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const updateTaskData = (
    taskData: Partial<Task>,
    showAlert = true
  ): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (taskData.id?.includes('TASK-ID-RAND')) {
        showAlert &&
          messageWarning('Wait! this task still syncing data from server')
        reject()
        return
      }

      if (!taskData.priority) {
        taskData.priority = TaskPriority.LOW
      }

      if (taskData.taskStatusId) {
        taskData.done = taskData.taskStatusId === statusDoneId
      }

      refactorTaskFieldByAutomationConfig(
        'task',
        taskData as ITaskDefaultValues
      )

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
            showAlert && messageError('update error')
            reject()
            return
          }
          showAlert && messageSuccess('update success')
          resolve(true)
        })
        .catch(error => {
          reject(error)
          showAlert && messageError('update error')
        })
    })
  }
  return {
    updateTaskData,
    updateMultiTaskData
  }
}
