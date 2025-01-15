import { useParams } from 'next/navigation'
import { useUser } from '@goalie/nextjs'
import { PartialTask, useTaskStore } from '@/store/task'
import { taskUpdate, taskUpdateMany } from '@/services/task'
import { messageError, messageSuccess, messageWarning } from '@shared/ui'
import { Task, TaskPriority } from '@prisma/client'
import { useTaskAutomation } from './useTaskAutomation'
import { ITaskDefaultValues } from '../[orgName]/project/[projectId]/TaskForm'
import { useProjectStatusStore } from '@/store/status'
import localforage from 'localforage'

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

    if (data.taskStatusId) {
      data.done = data.taskStatusId === statusDoneId
    }

    console.log('first', JSON.stringify(data))

    refactorTaskFieldByAutomationConfig('task', data as ITaskDefaultValues)
    console.log('next', JSON.stringify(data))

    return data
  }

  const updateMultiTaskData = (ids: string[], data: Partial<Task>) => {
    if (ids.some(id => _isRandomId(id))) {
      messageWarning('Wait! this task still syncing data from server')
      return
    }

    const updatedData = _handleTaskData(data)

    // const handledData = _handleTaskData(data)
    // const updatedData = {
    //   progress: handledData?.progress,
    //   dueDate: handledData?.dueDate,
    //   taskPoint: handledData?.taskPoint,
    //   priority: handledData?.priority,
    //   assigneeIds: handledData?.assigneeIds,
    //   taskStatusId: handledData?.taskStatusId
    // }
    console.log('handledData', updatedData)

    updateMultipleTask({
      updatedBy: user?.id,
      ...updatedData
    })

    localforage.removeItem(`TASKLIST_${projectId}`)

    taskUpdateMany(ids, { projectId, ...updatedData })
      .then(res => {
        messageSuccess('update success')
        console.log(res)
      })
      .catch(err => {
        messageError('Opps! Something went wrong')
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
    updateLocalTask: updateTask,
    updateTaskData,
    updateMultiTaskData
  }
}
