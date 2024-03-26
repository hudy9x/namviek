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
    const startRegex = /(\/start-(\d+)\s*)/
    const endRegex = /(\/end-(\d+)\s*)/

    const matchStart = startRegex.exec(v)
    const matchEnd = endRegex.exec(v)

    const d = new Date()
    const y = d.getFullYear()
    const m = month - 1

    let startDate = new Date(y, m, 1)
    let endDate = new Date(y, m, d.getDate())

    const visionData = {
      name: v,
      projectId,
      parentId: null,
      organizationId: orgID,
      startDate: new Date(y, m, 2),
      dueDate: new Date(y, m, 5)
    }

    // ex: goal 12 /start-2
    if (matchStart) {
      startDate = new Date(y, m, parseInt(matchStart[2], 10))
      visionData.name = visionData.name
        .replace(matchStart[0], '')
        .replace(/^\s*|\s*$/g, '')

      visionData.startDate = startDate
    }

    // ex: goal 14 /start-4 /end-15
    if (matchEnd) {
      endDate = new Date(y, m, parseInt(matchEnd[2], 10))
      const endOfDate = endOfMonth(new Date(y, m, 1))
      const eDate = endOfDate.getDate()

      if (endDate.getDate() > eDate) {
        messageError(`Date should be from 1 to ${eDate}`)
        return
      }

      visionData.name = visionData.name
        .replace(matchEnd[0], '')
        .replace(/^\s*|\s*$/g, '')

      visionData.dueDate = endDate
    }

    createNewVision(visionData)
  }
  return <ListBoxCreate placeholder="Create new goal" onEnter={onEnter} />
}
