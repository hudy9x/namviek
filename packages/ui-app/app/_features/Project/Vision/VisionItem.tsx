import ListCell from 'packages/ui-app/app/[orgID]/project/[projectId]/views/ListCell'
import VisionDelete from './VisionDelete'
import { useVisionContext } from './context'
import Droppable from '@/components/Dnd/Droppable'
import Badge from '@/components/Badge'

function VisionItem({
  active,
  name,
  id,
  progress,
  inprogress
}: {
  active: boolean
  name: string
  id: string
  progress: number
  inprogress: number
}) {
  const { setSelected, selected } = useVisionContext()
  // const date = dueDate ? formatDistanceToNow(new Date(dueDate)) : ''
  const color = progress === 0 ? 'red' : progress === 100 ? 'green' : 'yellow'

  return (
    <Droppable droppableId={id} type="vision" className="vision-dropzone">
      <div
        className={`vision-item group cursor-pointer ${
          active ? 'bg-indigo-50/50 dark:bg-gray-800' : ''
        }`}
        onClick={() => {
          setSelected(selected !== id ? id : '')
        }}>
        <div className="flex items-center gap-2 dark:text-gray-300">
          <div className="w-full flex flex-col gap-0.5">
            <span>{name}</span>
            {inprogress ? (
              <span className="text-[11px] text-yellow-600 capitalize">
                in progress: {inprogress}
              </span>
            ) : null}

            {progress === 100 ? (
              <span className="text-[11px] text-gray-400 capitalize">
                resolved
              </span>
            ) : null}
            {/* {name} - {tasks.length} */}
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-300">
          <div className="list-box-actions group-hover:opacity-100 opacity-0 transition-all">
            <VisionDelete id={id} />
          </div>
          <ListCell width={40}>
            <Badge title={`${progress || 0} %`} color={color} />
          </ListCell>
          {/* <ListCell width={110}>{date}</ListCell> */}
        </div>
      </div>
    </Droppable>
  )
}

export default VisionItem
