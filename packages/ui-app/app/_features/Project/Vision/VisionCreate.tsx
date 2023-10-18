import ListBoxCreate from '@/components/ListBox/ListBoxCreate'
import { useParams } from 'next/navigation'
import { useVisionContext } from './context'

export default function VisionCreate() {
  const { projectId, orgID } = useParams()
  const { createNewVision } = useVisionContext()
  const onEnter = (v: string) => {
    createNewVision({
      name: v,
      projectId,
      parentId: null,
      organizationId: orgID,
      dueDate: new Date()
    })
  }
  return <ListBoxCreate placeholder="Create new vision" onEnter={onEnter} />
}
