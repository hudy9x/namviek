import { CreateSubTask } from './CreateSubTask'
import { TaskContext } from './ListMode'
import { useContext } from 'react'

export const ListSubTask = () => {
  const { isOpen } = useContext(TaskContext)
  return (
    isOpen ? (
      <div>
        <CreateSubTask/>
        <div>SUB-TASK-1</div>
        <div>SUB-TASK-1</div>
        <div>SUB-TASK-1</div>
      </div>
    ) : <></>
  )
}

