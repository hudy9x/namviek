import { Dialog, messageError, messageSuccess } from '@shared/ui'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ITaskDefaultValues, defaultFormikValues } from './TaskForm'
import { useTaskStore } from '@/store/task'
import { useUser } from '@goalie/nextjs'
import { taskUpdate } from '@/services/task'
import { Task } from '@prisma/client'
import { useTaskAutomation } from '@/hooks/useTaskAutomation'
import FileKitContainer from '@/components/FileKits'
import TaskDetail from '@/features/TaskDetail'
import { deleteState, onPushStateRun } from 'packages/ui-app/libs/pushState'


function TaskUpdateModal({
  id,
  visible,
  setVisible,
  task,
  onSubmit
}:
  {
    id: string
    task: ITaskDefaultValues,
    visible: boolean,
    setVisible: () => void,
    onSubmit: (v: ITaskDefaultValues, cb: () => void) => void
  }) {

  return <Dialog.Root open={visible} onOpenChange={() => {
    setVisible()
  }}>
    <Dialog.Portal>
      <Dialog.Content size='lg'>
        <FileKitContainer taskId={id} fileIds={task.fileIds}>
          <TaskDetail
            id={id || ''}
            cover={task.cover || ''}
            defaultValue={task}
            onSubmit={onSubmit}
          />
        </FileKitContainer>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>

}

function useTaskIdChange(fn: (id: string) => void) {
  useEffect(() => {
    const destroy = onPushStateRun((url: string) => {

      const newUrl = new URL(url)
      const taskId = newUrl.searchParams.get('taskId')
      // setTaskId(taskId || '')
      fn(taskId || '')
    })

    return () => {
      destroy()
    }
  }, [])

  useEffect(() => {
    const newUrl = new URL(window.location.toString())
    const taskId = newUrl.searchParams.get('taskId')
    if (taskId) {
      fn(taskId)
    }

  }, [])

}

export const TaskUpdate2 = () => {
  const [taskId, setTaskId] = useState('')
  const { syncRemoteTaskById, tasks, updateTask } = useTaskStore()

  const { refactorTaskFieldByAutomationConfig } = useTaskAutomation()

  const [currentTask, setCurrentTask] =
    useState<ITaskDefaultValues>(defaultFormikValues)
  const refCurrentTask = useRef<Task>()
  const { user } = useUser()

  useTaskIdChange((id) => {
    setTaskId(id)
  })


  useEffect(() => {
    if (!taskId) return

  }, [taskId])

  const closeTheModal = () => {
    deleteState('taskId')
  }

  const handleSubmit = (v: ITaskDefaultValues, cb: () => void) => {
    if (!taskId) return

    const dataUpdate = {
      ...v,
      id: taskId,
      updatedBy: user?.id,
      updatedAt: new Date()
    }

    updateTask(dataUpdate)
    closeTheModal()
    refactorTaskFieldByAutomationConfig('task', dataUpdate)

    // clear fileIds cuz we've updated fileIds already
    // see <FileUpload /> component
    dataUpdate.fileIds = []

    taskUpdate(dataUpdate)
      .then(res => {
        const { data, status } = res.data
        if (status !== 200) {
          cb()
          return
        }

        messageSuccess('Synced success !')
        syncRemoteTaskById(data.id, data as Task)
        cb()
      })
      .catch(err => {
        messageError('Update new task error')
        cb()

        if (!refCurrentTask.current) return
        // syncRemoteTaskById(refCurrentTask.current.id, refCurrentTask.current)
        console.log(err)
      })
  }

  // When copy the url with taskId param and paste to another tab
  // The form will be rendered first, the defaultValue updated later
  // Thus, we need to make sure that the defaultValue update first
  // That's why we use useLayoutEffect here
  // It block render process and only run when the inside code run already
  useLayoutEffect(() => {
    if (!taskId || !tasks || !tasks.length) return
    const currentTask = tasks.find(task => task.id === taskId)
    refCurrentTask.current = currentTask

    if (currentTask) {
      setCurrentTask({
        title: currentTask?.title || defaultFormikValues.title,
        type: currentTask.type || defaultFormikValues.type,
        fileIds: currentTask.fileIds || [],
        cover: currentTask.cover || '',
        taskStatusId:
          currentTask?.taskStatusId || defaultFormikValues.taskStatusId,
        priority: currentTask.priority
          ? currentTask.priority
          : defaultFormikValues.priority,
        startDate: currentTask.startDate
          ? new Date(currentTask.startDate)
          : defaultFormikValues.startDate,
        dueDate: currentTask.dueDate
          ? new Date(currentTask.dueDate)
          : defaultFormikValues.dueDate,
        plannedDueDate: currentTask.plannedDueDate
          ? new Date(currentTask.plannedDueDate)
          : defaultFormikValues.plannedDueDate,
        planedStartDate: currentTask.plannedStartDate
          ? new Date(currentTask.plannedStartDate)
          : defaultFormikValues.planedStartDate,
        assigneeIds: currentTask.assigneeIds
          ? currentTask.assigneeIds
          : defaultFormikValues.assigneeIds,
        desc: currentTask.desc ? currentTask.desc : defaultFormikValues.desc,
        progress: currentTask.progress
          ? currentTask.progress
          : defaultFormikValues.progress
      })
    }
  }, [taskId, tasks])

  return <TaskUpdateModal
    id={taskId}
    task={currentTask}
    onSubmit={handleSubmit}
    visible={!!taskId}
    setVisible={() => {
      // closeTaskDetail()
      deleteState('taskId')
      // router.replace(`${orgID}/project/${projectId}?mode=${mode}`)
    }} />
}
