import { Button } from '@shared/ui'
import TaskDeleteAction from './TaskDeleteAction'
import './style.css'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2'
import { LuGitBranchPlus } from 'react-icons/lu'
import SubTaskAction from './SubTaskAction'

interface ITaskActionsProps {
  taskId: string
  className?: string
}
export default function TaskActions({ className, taskId }: ITaskActionsProps) {
  return (
    <div className={`task-actions ${className}`}>
      <SubTaskAction/>
      <Button leadingIcon={<HiOutlineDocumentDuplicate />} />
      <TaskDeleteAction id={taskId} />
    </div>
  )
}
