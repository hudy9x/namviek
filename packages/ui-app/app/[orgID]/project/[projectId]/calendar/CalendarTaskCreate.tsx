import { Modal } from '@shared/ui'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskForm from '../TaskForm'

export default function CalendarTaskCreate({ dueDate }: { dueDate: Date }) {
  const [visible, setVisible] = useState(false)

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
              onSuccess={() => {
                setVisible(false)
              }}
            />
          </>
        }
      />
    </div>
  )
}
