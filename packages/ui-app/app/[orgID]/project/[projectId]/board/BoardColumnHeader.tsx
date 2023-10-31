import { DraggableProvided } from 'react-beautiful-dnd'
import { MdDragIndicator } from 'react-icons/md'
import { BoardActionCreateTaskWithIcon } from './BoardActionCreateTask'
import { useTaskFilter } from '@/features/TaskFilter/context'
import { Avatar } from '@shared/ui'
import TaskCheckAll from '../views/TaskCheckAll'

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
  const { isGroupbyAssignee, groupByLoading } = useTaskFilter()

  return (
    <div className="relative">
      <div
        className={`board-header-loading ${
          groupByLoading ? 'visible' : 'invisible '
        }`}></div>
      <div className="board-col-header">
        <div
          className={`board-header-section ${
            groupByLoading ? 'opacity-0' : 'opacity-100'
          }`}>
          <div className="w-3 h-4 text-gray-400" {...provided.dragHandleProps}>
            <MdDragIndicator />
          </div>
          <TaskCheckAll groupId={id}/>
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
    </div>
  )
}
