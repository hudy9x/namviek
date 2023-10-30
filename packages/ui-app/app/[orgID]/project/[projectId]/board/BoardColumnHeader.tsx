import { DraggableProvided } from 'react-beautiful-dnd'
import { MdDragIndicator } from 'react-icons/md'
import { BoardActionCreateTaskWithIcon } from './BoardActionCreateTask'
import { useTaskFilter } from '@/features/TaskFilter/context'
import { Avatar } from '@shared/ui'

interface IBoardColumnHeaderProps {
  color?: string
  icon?: string
  name: string
  id: string
  provided: DraggableProvided
}
export default function BoardColumHeader({
  color,
  icon,
  name,
  id,
  provided
}: IBoardColumnHeaderProps) {
  const { isGroupbyAssignee } = useTaskFilter()

  return (
    <div className="py-1 px-3 flex items-center justify-between">
      <div className="flex border-1 border-transparent items-center gap-2">
        <div className="w-3 h-4 text-gray-400" {...provided.dragHandleProps}>
          <MdDragIndicator />
        </div>
        {isGroupbyAssignee ? (
          <Avatar size="md" name={name} src={icon || ''} />
        ) : (
          <div
            className="w-4 h-4 rounded"
            style={{ backgroundColor: color }}></div>
        )}
        <span className="text-sm text-gray-500">{name}</span>
      </div>
      <div>
        <BoardActionCreateTaskWithIcon groupId={id} />
      </div>
    </div>
  )
}
