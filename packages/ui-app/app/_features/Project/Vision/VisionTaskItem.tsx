import Draggable from '@/components/Dnd/Draggable'
import { HiOutlineDotsVertical } from 'react-icons/hi'

export default function VisionTaskItem({
  id,
  title
}: {
  id: string
  title: string
}) {
  return (
    <Draggable
      draggableId={id}
      className="px-3 py-2.5 text-sm bg-white border rounded-md shadow-md shadow-indigo-100">
      <div className="flex items-center gap-2">
        <HiOutlineDotsVertical className="text-gray-400 shrink-0" />
        <span className="line-clamp-2" title={title}>
          {title}
        </span>
      </div>
    </Draggable>
  )
}
