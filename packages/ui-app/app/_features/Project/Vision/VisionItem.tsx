import { memo } from 'react'
import ListCell from 'packages/ui-app/app/[orgID]/project/[projectId]/views/ListCell'
import VisionDelete from './VisionDelete'
import { VisionField, useVisionContext } from './context'
import ProgressBar from '@/components/ProgressBar'
import { formatDistanceToNow } from 'date-fns'
import Droppable from '@/components/Dnd/Droppable'
import { Task } from '@prisma/client'
import { Form } from '@shared/ui'

function VisionItem({
  active,
  name,
  id,
  progress
}: {
  active: boolean
  name: string
  id: string
  progress: number
}) {
  const { setSelected, selected } = useVisionContext()
  // const date = dueDate ? formatDistanceToNow(new Date(dueDate)) : ''
  console.log(id)
  const color =
    progress === 0
      ? 'bg-gray-100 text-gray-600'
      : progress === 100
      ? 'bg-green-500 text-gray-100'
      : 'bg-yellow-500 text-gray-50'

  return (
    <Droppable droppableId={id} type="vision" className="vision-dropzone">
      <div
        className={`vision-item group cursor-pointer ${
          active ? 'bg-indigo-50/50' : ''
        }`}
        onClick={() => {
          setSelected(selected !== id ? id : '')
        }}>
        <div className="flex items-center gap-2 dark:text-gray-300">
          <div className="w-full flex items-center gap-2">
            {name}
            {/* {name} - {tasks.length} */}
          </div>
          <div className="list-box-actions group-hover:opacity-100 opacity-0 transition-all">
            <VisionDelete id={id} />
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
          <ListCell width={40}>
            <div className={`${color} text-[10px] text-center rounded-sm px-1`}>
              {progress || 0}%
            </div>
          </ListCell>
          {/* <ListCell width={110}>{date}</ListCell> */}
        </div>
      </div>
    </Droppable>
  )
}

export default VisionItem
