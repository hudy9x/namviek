import { MouseEvent } from 'react'
import { AiOutlinePushpin } from 'react-icons/ai'

export default function ProjectPin({ projectId }: { projectId: string }) {
  const onPin = (ev: MouseEvent<SVGElement>) => {
    ev.stopPropagation()
  }
  return (
    <AiOutlinePushpin
      onClick={onPin}
      className="absolute -top-3.5 -right-1 w-7 h-7 p-1.5 rounded-md bg-gray-900"
    />
  )
}
