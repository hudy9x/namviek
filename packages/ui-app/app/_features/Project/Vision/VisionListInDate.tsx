import Draggable from '@/components/Dnd/Draggable'
import { VisionField } from './context'

function VisionItemInDate({ id, name }: { id: string; name: string }) {
  return (
    <Draggable draggableId={id}>
      {provided => (
        <div
          {...provided.listeners}
          {...provided.attributes}
          title={name}
          key={id}
          className="truncate px-2 py-1 bg-white rounded-md border">
          {name}
        </div>
      )}
    </Draggable>
  )
}

export default function VisionListInDate({
  visions
}: {
  visions: VisionField[]
}) {
  return (
    <div className="space-y-1 pt-6 px-2">
      {visions.map(vision => {
        const { id, name } = vision
        return <VisionItemInDate key={id} id={id} name={name} />
      })}
    </div>
  )
}
