import { Modal } from '@shared/ui'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import TaskForm from '../TaskForm'

export const BoardActionCreateTaskWithIcon = ({
  groupId
}: {
  groupId: string
}) => {
  const [visible, setVisible] = useState(false)
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
            onSuccess={() => {
              setVisible(false)
            }}
          />
        </>
      }
    />
  )
}

export const BoardActionCreateTask = ({ groupId }: { groupId: string }) => {
  const [visible, setVisible] = useState(false)
  return (
    <Modal
      visible={visible}
      onVisibleChange={setVisible}
      title="Add a new task"
      triggerBy={
        <div className="px-3 py-2 flex justify-center rounded-md bg-white hover:bg-gray-50  text-gray-500 shadow shadow-gray-200 hover:cursor-pointer border">
          <AiOutlinePlus />
        </div>
      }
      content={
        <>
          <TaskForm
            taskStatusId={groupId}
            onSuccess={() => {
              setVisible(false)
            }}
          />
        </>
      }
    />
  )
}
