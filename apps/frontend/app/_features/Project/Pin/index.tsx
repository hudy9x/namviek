import { useProjectPinUnpin } from '@/hooks/useProjectPinUnPin'
import { MouseEvent } from 'react'
import { AiOutlinePushpin } from 'react-icons/ai'

export default function ProjectPin({
  projectId,
  pinned
}: {
  projectId: string
  pinned?: boolean
}) {
  const { pinProject, unpinProject } = useProjectPinUnpin()
  const onPin = (ev: MouseEvent<SVGElement>) => {
    ev.stopPropagation()
    if (pinned) {
      unpinProject(projectId)
    } else {
      pinProject(projectId)
    }
  }

  return (
    <AiOutlinePushpin
      onClick={onPin}
      className="absolute -top-3.5 -right-1 w-7 h-7 p-1.5 rounded-md bg-gray-50 dark:bg-gray-900 border dark:border-gray-700"
    />
  )
}
