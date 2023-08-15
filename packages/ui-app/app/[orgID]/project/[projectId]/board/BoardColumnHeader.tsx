import { DraggableProvided } from 'react-beautiful-dnd'
import { MdDragIndicator } from 'react-icons/md'
import { BoardActionCreateTaskWithIcon } from './BoardActionCreateTask'
import { TaskStatus } from '@prisma/client'

interface IBoardColumnHeaderProps {
  status: TaskStatus
  provided: DraggableProvided
}
export default function BoardColumHeader({
  status,
  provided
}: IBoardColumnHeaderProps) {
  return (
    <div className="py-1 flex items-center justify-between">
      <div className="flex border-1 border-transparent items-center gap-2">
        <div className="w-3 h-4 text-gray-400" {...provided.dragHandleProps}>
          <MdDragIndicator />
        </div>
        <div
          className="w-4 h-4 rounded"
          style={{ backgroundColor: status.color }}></div>
        <span className="text-sm text-gray-500">{status.name}</span>
      </div>
      <div>
        <BoardActionCreateTaskWithIcon groupId={status.id} />
      </div>
    </div>
  )
}
