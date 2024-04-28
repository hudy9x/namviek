import { Dialog, Modal, messageError, messageSuccess } from '@shared/ui'
import { useSearchParams, useRouter, useParams } from 'next/navigation'
import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import TaskForm, { ITaskDefaultValues, defaultFormikValues } from './TaskForm'
import { useTaskStore } from '@/store/task'
import { useUser } from '@goalie/nextjs'
import { taskUpdate } from '@/services/task'
import { Task } from '@prisma/client'
import { useTaskAutomation } from '@/hooks/useTaskAutomation'
import FileKitContainer from '@/components/FileKits'
import TaskDetail from '@/features/TaskDetail'
import { useTaskViewStore } from '@/store/taskView'
import { MdClose } from 'react-icons/md'
import { useEscapeKeyPressed } from '@/hooks/useEscapeKeyPressed'

// function TaskUpdateModal({
//   id,
//   visible,
//   setVisible,
//   task,
//   onSubmit,
//   children }:
//   {
//     id: string
//     task: ITaskDefaultValues,
//     visible: boolean,
//     setVisible: () => void,
//     children?: ReactNode
//     onSubmit: (v: ITaskDefaultValues) => void
//   }) {
//
//   useEscapeKeyPressed(() => {
//     console.log('1')
//     setVisible()
//   })
//
//   if (!id) return null;
//
//   const classes = 'fixed flex items-center justify-center top-0 left-0 w-full h-full z-50 overflow-y-auto'
//
//   return <div onClick={setVisible} className={`${classes} ${visible ? '' : 'invisible pointer-events-none'}`}>
//     <div onClick={ev => {
//       ev.stopPropagation()
//     }} className='modal-content modal-size-lg'>
//       {/* <h2>{task.title}</h2> */}
//       {/* <p>{task.desc}</p> */}
//       <span onClick={setVisible} className='modal-close cursor-pointer z-10'>
//         <MdClose />
//       </span>
//       <FileKitContainer fileIds={task.fileIds}>
//         <TaskDetail
//           id={id || ''}
//           cover={task.cover || ''}
//           defaultValue={task}
//           onSubmit={onSubmit}
//         />
//       </FileKitContainer>
//     </div>
//   </div>
// }

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
    onSubmit: (v: ITaskDefaultValues) => void
  }) {

  // if (!id) return null;


  return <Dialog.Root open={visible} onOpenChange={setVisible}>
    <Dialog.Portal>
      <Dialog.Content>
        <FileKitContainer fileIds={task.fileIds}>
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

  // const classes = 'fixed flex items-center justify-center top-0 left-0 w-full h-full z-50 overflow-y-auto'
  //
  // return <div onClick={setVisible} className={`${classes} ${visible ? '' : 'invisible pointer-events-none'}`}>
  //   <div onClick={ev => {
  //     ev.stopPropagation()
  //   }} className='modal-content modal-size-lg'>
  //     {/* <h2>{task.title}</h2> */}
  //     {/* <p>{task.desc}</p> */}
  //     <span onClick={setVisible} className='modal-close cursor-pointer z-10'>
  //       <MdClose />
  //     </span>
  //     <FileKitContainer fileIds={task.fileIds}>
  //       <TaskDetail
  //         id={id || ''}
  //         cover={task.cover || ''}
  //         defaultValue={task}
  //         onSubmit={onSubmit}
  //       />
  //     </FileKitContainer>
  //   </div>
  // </div>
}

export const TaskUpdate2 = () => {
  const { taskId, closeTaskDetail } = useTaskViewStore()
  // const { taskId, closeTaskDetail } = useTaskViewStore()
  // const sp = useSearchParams()
  const { syncRemoteTaskById, tasks, taskLoading, updateTask } = useTaskStore()

  const { refactorTaskFieldByAutomationConfig } = useTaskAutomation()

  const [currentTask, setCurrentTask] =
    useState<ITaskDefaultValues>(defaultFormikValues)
  const refCurrentTask = useRef<Task>()
  const { user } = useUser()
  // const { orgID, projectId } = useParams()
  // const router = useRouter()
  // const mode = sp.get('mode')
  // const taskId = sp.get('taskId')

  useEffect(() => {
    if (!taskId) return

  }, [taskId])

  const closeTheModal = () => {
    closeTaskDetail()
    // router.replace(`${orgID}/project/${projectId}?mode=${mode}`)
  }

  const handleSubmit = (v: ITaskDefaultValues) => {
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
        if (status !== 200) return

        messageSuccess('Synced success !')
        syncRemoteTaskById(data.id, data as Task)
      })
      .catch(err => {
        messageError('Update new task error')

        if (!refCurrentTask.current) return
        // syncRemoteTaskById(refCurrentTask.current.id, refCurrentTask.current)
        console.log(err)
      })
      .finally(() => {
        // setVisible(false)
        // router.replace(`${orgID}/project/${projectId}?mode=${mode}`)
      })
  }

  // When copy the url with taskId param and paste to another tab
  // The form will be rendered first, the defaultValue updated later
  // Thus, we need to make sure that the defaultValue update first
  // That's why we use useLayoutEffect here
  // It block render process and only run when the inside code run already
  useEffect(() => {
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
      closeTaskDetail()
      // router.replace(`${orgID}/project/${projectId}?mode=${mode}`)
    }} />
}
