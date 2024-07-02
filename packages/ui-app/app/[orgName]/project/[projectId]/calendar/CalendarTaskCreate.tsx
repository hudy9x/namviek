import { Modal, messageError, messageSuccess } from '@shared/ui'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskForm, { ITaskDefaultValues } from '../TaskForm'
import { useTaskStore } from '@/store/task'
import { taskAdd } from '@/services/task'
import { Task } from '@prisma/client'

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

export default function CalendarTaskCreate({ dueDate }: { dueDate: Date }) {
  const [visible, setVisible] = useState(false)
  const { handleSubmit } = useHandleSubmit(() => {
    setVisible(false)
  })

  return (
    <div>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Add a new task"
        triggerBy={
          <div>
            <AiOutlinePlus className="calendar-create-task " />
          </div>
        }
        content={
          <>
            <TaskForm
              dueDate={dueDate}
              onSubmit={v => {
                handleSubmit(v)
              }}
            />
          </>
        }
      />
    </div>
  )
}
