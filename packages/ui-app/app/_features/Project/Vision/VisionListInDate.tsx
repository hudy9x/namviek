import Draggable from '@/components/Dnd/Draggable'
import { VisionField, useVisionContext } from './context'
import { HiOutlineDotsVertical } from 'react-icons/hi'

function VisionItemInDate({
  id,
  name,
  progress
}: {
  id: string
  name: string
  progress: number
}) {
  const color =
    progress === 100
      ? 'bg-green-500'
      : progress === 0
      ? 'bg-red-400'
      : 'bg-yellow-400'

  return (
    <Draggable draggableId={id} className="w-full">
      {provided => (
        <div
          title={name}
          key={id}
          className={`px-2 overflow-hidden pt-1 pb-1.5 rounded-md border relative ${
            progress === 0 ? 'animate-pulse border-red-400 border-dashed' : ''
          } bg-white dark:bg-gray-800 dark:border-gray-700`}>
          <div className="flex items-center gap-1">
            <div {...provided.listeners} {...provided.attributes}>
              <HiOutlineDotsVertical className="text-gray-400 hover:text-gray-500 shrink-0" />
            </div>
            <span className="line-clamp-2 grow-0">{name}</span>
          </div>
          <div
            className={`absolute bottom-0 left-0 h-[2px] ${color}`}
            style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </Draggable>
  )
}

export default function VisionListInDate({ date }: { date: Date }) {
  const { getVisionProgress, getVisionByDay } = useVisionContext()

  const key = `${date.getDate()}-${date.getMonth()}`
  const visions = getVisionByDay(key)

  return (
    <div className="space-y-1 pt-6 px-2 overflow-y-auto overflow-x-hidden pb-6 h-[110px] custom-scrollbar">
      {visions.map(vision => {
        const { id, name } = vision
        const progress = getVisionProgress(id) || 0
        return (
          <VisionItemInDate key={id} id={id} name={name} progress={progress} />
        )
      })}
    </div>
  )
}
