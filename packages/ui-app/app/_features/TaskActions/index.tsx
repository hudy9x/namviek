import { Button } from '@shared/ui'
import TaskDeleteAction from './TaskDeleteAction'
import './style.css'
import { HiOutlineDocumentDuplicate } from 'react-icons/hi2'
import { LuGitBranchPlus } from 'react-icons/lu'

interface ITaskActionsProps {
  taskId: string
  className?: string
}
export default function TaskActions({ className, taskId }: ITaskActionsProps) {
  return (
    <div className={`task-actions ${className}`}>
      <Button leadingIcon={<LuGitBranchPlus />} />
      <Button leadingIcon={<HiOutlineDocumentDuplicate />} />
      <TaskDeleteAction id={taskId} />
    </div>
  )
}
