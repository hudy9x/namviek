import { Button, Form, Modal, messageError, messageSuccess } from '@shared/ui'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskForm, { ITaskDefaultValues, defaultFormikValues } from '../TaskForm'
import { useTaskStore } from '@/store/task'
import { taskAdd } from '@/services/task'
import { Task, TaskPriority } from '@prisma/client'
import { useTaskFilter } from '@/features/TaskFilter/context'
import { useParams } from 'next/navigation'

export const BoardActionCreateTaskWithIcon = ({
  groupId
}: {
  groupId: string
}) => {
  const { isGroupbyStatus, isGroupbyAssignee, isGroupbyPriority } =
    useTaskFilter()
  const [visible, setVisible] = useState(false)
  const { handleSubmit } = useHandleSubmit(() => {
    setVisible(false)
  })

  const defaultData: ITaskDefaultValues = { ...defaultFormikValues }

  if (isGroupbyStatus) {
    defaultData.taskStatusId = groupId
  }

  if (isGroupbyAssignee) {
    defaultData.assigneeIds = [groupId]
  }

  if (isGroupbyPriority) {
    defaultData.priority = groupId as TaskPriority
  }

  return (
    <Modal
      visible={visible}
      onVisibleChange={setVisible}
      title="Add a new task"
      triggerBy={<AiOutlinePlus className="cursor-pointer text-gray-500" />}
      content={
        <>
          <TaskForm
            defaultValue={defaultData}
            onSubmit={v => {
              handleSubmit(v)
            }}
          />
        </>
      }
    />
  )
}

const useHandleSubmit = (cb: () => void) => {
  const { addOneTask, syncRemoteTaskById } = useTaskStore()

  const handleSubmit = (v: ITaskDefaultValues) => {
    const randomId = `TASK-ID-RAND-${Date.now()}`

    cb()
    addOneTask({
      ...v,
      ...{
        id: randomId
      }
    })

    taskAdd(v)
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

  return { handleSubmit }
}

export const BoardActionCreateTask = ({ groupId }: { groupId: string }) => {
  const { isGroupbyPriority, isGroupbyAssignee, isGroupbyStatus } =
    useTaskFilter()
  const [visible, setVisible] = useState(false)
  const { projectId } = useParams()
  const { handleSubmit } = useHandleSubmit(() => {
    // setVisible(false)
  })

  const defaultData: ITaskDefaultValues = { ...defaultFormikValues }

  if (isGroupbyStatus) {
    defaultData.taskStatusId = groupId
  }

  if (isGroupbyAssignee) {
    defaultData.assigneeIds = [groupId]
  }

  if (isGroupbyPriority) {
    defaultData.priority = groupId as TaskPriority
  }

  return (
    <div>
      <div className={`${visible ? 'hidden' : ''}`}>
        <Button
          onClick={() => setVisible(true)}
          block={true}
          leadingIcon={<AiOutlinePlus />}
        />
      </div>
      <Form.Input
        focus={visible}
        onBlur={() => setVisible(false)}
        onEsc={() => setVisible(false)}
        onEnter={(val, target) => {
          handleSubmit({ ...defaultData, ...{ title: val, projectId } })
          target.value = ''
        }}
        placeholder="Create new task"
        icon={<AiOutlinePlus />}
        className={`${visible ? '' : 'hidden'}`}
      />
    </div>
  )
}
