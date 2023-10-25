import ListBoxCreate from '@/components/ListBox/ListBoxCreate'
import { useParams } from 'next/navigation'
import { useVisionContext } from './context'
import { endOfMonth } from 'date-fns'
import { messageError } from '@shared/ui'

export default function VisionCreate() {
  const { projectId, orgID } = useParams()
  const { createNewVision, filter } = useVisionContext()
  const { month } = filter
  const onEnter = (v: string) => {
    const dateRegex = /\/\d+/
    const match = dateRegex.exec(v)
    const d = new Date()
    const y = d.getFullYear()
    const m = month - 1
    const visionData = {
      name: v,
      projectId,
      parentId: null,
      organizationId: orgID,
      dueDate: new Date(y, m, 1)
    }

    if (match) {
      const date = match[0]
      const dateNum = parseInt(date.replace('/', ''), 10)
      const endOfDate = endOfMonth(new Date(y, m, 1))
      const eDate = endOfDate.getDate()

      if (dateNum > eDate) {
        messageError(`Date should be from 1 to ${eDate}`)
        return
      }

      visionData.name = v.replace(date, '').replace(/^\s*|\s*$/g, '')
      visionData.dueDate = new Date(y, m, dateNum, 18, 0)
    }

    createNewVision(visionData)
  }
  return <ListBoxCreate placeholder="Create new vision" onEnter={onEnter} />
}
