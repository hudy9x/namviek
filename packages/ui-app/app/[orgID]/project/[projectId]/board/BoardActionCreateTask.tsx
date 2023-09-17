import { Button, Modal, messageError, messageSuccess } from '@shared/ui'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskForm, { ITaskDefaultValues } from '../TaskForm'
import { useTaskStore } from '@/store/task'
import { taskAdd } from '@/services/task'
import { Task } from '@prisma/client'

export const BoardActionCreateTaskWithIcon = ({
  groupId
}: {
  groupId: string
}) => {
  const [visible, setVisible] = useState(false)
  const { handleSubmit } = useHandleSubmit(() => {
    setVisible(false)
  })

  return (
    <Modal
      visible={visible}
      onVisibleChange={setVisible}
      title="Add a new task"
      triggerBy={<AiOutlinePlus className="cursor-pointer text-gray-500" />}
      content={
        <>
          <TaskForm
            taskStatusId={groupId}
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
  const [visible, setVisible] = useState(false)
  const { handleSubmit } = useHandleSubmit(() => {
    setVisible(false)
  })
  return (
    <Modal
      visible={visible}
      onVisibleChange={setVisible}
      title="Add a new task"
      triggerBy={
        <div>
          <Button block={true} leadingIcon={<AiOutlinePlus />} />
        </div>
      }
      content={
        <>
          <TaskForm
            taskStatusId={groupId}
            onSubmit={v => {
              handleSubmit(v)
            }}
          />
        </>
      }
    />
  )
}
