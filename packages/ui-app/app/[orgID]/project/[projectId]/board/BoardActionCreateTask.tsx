import { Button, Modal } from '@shared/ui'
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
        <div>
          <Button block={true} leadingIcon={<AiOutlinePlus />} />
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
