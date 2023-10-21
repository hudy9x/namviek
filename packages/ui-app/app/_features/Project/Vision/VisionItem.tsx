import ListCell from 'packages/ui-app/app/[orgID]/project/[projectId]/views/ListCell'
import VisionDelete from './VisionDelete'
import { VisionField } from './context'
import ProgressBar from '@/components/ProgressBar'
import { formatDistanceToNow } from 'date-fns'
import Droppable from '@/components/Dnd/Droppable'
import { Task } from '@prisma/client'

export default function VisionItem({
  data,
  tasks
}: {
  data: VisionField
  tasks: Task[]
}) {
  const { name, id, progress, dueDate } = data
  const date = dueDate ? formatDistanceToNow(new Date(dueDate)) : ''
  return (
    <Droppable droppableId={id} type="vision" className="vision-dropzone">
      <div className="vision-item group">
        <div className="flex items-center gap-2 dark:text-gray-300">
          <div className="w-full">
            {name} - {tasks.length}
          </div>
          <div className="list-box-actions group-hover:opacity-100 opacity-0 transition-all">
            <VisionDelete id={id} />
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
          <ListCell width={80}>
            <ProgressBar color="green" progress={progress || 0} />
          </ListCell>
          {/* <ListCell width={110}>{date}</ListCell> */}
        </div>
      </div>
    </Droppable>
  )
}
