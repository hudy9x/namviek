import Draggable from '@/components/Dnd/Draggable'
import TaskStatus from 'packages/ui-app/app/[orgID]/project/[projectId]/views/TaskStatus'
import { HiOutlineDotsVertical } from 'react-icons/hi'

export default function VisionTaskItem({
  id,
  title,
  statusId
}: {
  id: string
  statusId: string
  title: string
}) {
  return (
    <Draggable
      draggableId={id}
      className="px-3 py-2.5 text-sm bg-white border rounded-md shadow-md shadow-indigo-100 dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-900">
      {provider => (
        <div className="flex items-center gap-2">
          <TaskStatus taskId={id} value={statusId} />
          <div {...provider.listeners} {...provider.attributes}>
            <HiOutlineDotsVertical className="text-gray-400 hover:text-gray-500 shrink-0" />
          </div>
          <span className="line-clamp-2" title={title}>
            {title}
          </span>
        </div>
      )}
    </Draggable>
  )
}
