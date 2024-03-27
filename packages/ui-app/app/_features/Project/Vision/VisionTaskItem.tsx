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
      className="text-sm bg-white border rounded-md shadow-md shadow-indigo-100 dark:bg-gray-900 dark:border-gray-700 dark:shadow-gray-900">
      {provider => (
        <div className="flex items-center">
          <div className="pl-3 py-2.5">
            <TaskStatus taskId={id} value={statusId} />
          </div>
          {/* <div {...provider.listeners} {...provider.attributes}> */}
          {/*   <HiOutlineDotsVertical className="text-gray-400 hover:text-gray-500 shrink-0" /> */}
          {/* </div> */}
          <div
            className="line-clamp-2 w-full px-3 py-2.5"
            {...provider.listeners}
            {...provider.attributes}
            title={title}>
            {title}
          </div>
        </div>
      )}
    </Draggable>
  )
}
