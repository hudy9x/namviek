import { Button, Modal, messageError, messageSuccess } from '@shared/ui'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskForm, { ITaskDefaultValues } from './TaskForm'
import { useSearchParams } from 'next/navigation'
import { taskAdd } from '../../../../services/task'
import { useTaskStore } from '@/store/task'
import { Task } from '@prisma/client'

export default function TaskCreate() {
  const sp = useSearchParams()
  const mode = sp.get('mode')
  const { addOneTask, syncRemoteTaskById } = useTaskStore()
  const [visible, setVisible] = useState(false)

  if (mode !== 'task') {
    return null
  }

  const handleSubmit = (v: ITaskDefaultValues) => {
    const randomId = `TASK-ID-RAND-${Date.now()}`

    setVisible(false)
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

  return (
    <div>
      <Modal
        visible={visible}
        onVisibleChange={setVisible}
        title="Add a new task"
        triggerBy={
          <div>
            <Button
              primary
              leadingIcon={<AiOutlinePlus />}
              title="Create task"
              className="fixed-craete-btn"
            />
          </div>
        }
        content={
          <>
            <TaskForm onSubmit={v => handleSubmit(v)} />
          </>
        }
      />
    </div>
  )
}
