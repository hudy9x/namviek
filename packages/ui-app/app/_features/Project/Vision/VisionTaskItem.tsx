import Draggable from '@/components/Dnd/Draggable'
import StatusSelect from '@/components/StatusSelect'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'
import { useProjectStatusStore } from '@/store/status'
import { Form } from '@shared/ui'
import { useParams } from 'next/navigation'
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
      className="px-3 py-2.5 text-sm bg-white border rounded-md shadow-md shadow-indigo-100">
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
