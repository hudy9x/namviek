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
            <AiOutlinePlus className="absolute cursor-pointer hover:text-gray-600 w-6 h-6 p-1 rounded-md hover:bg-gray-200 text-center bottom-1 right-1" />
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
