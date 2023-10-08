import { useProjectStore } from '@/store/project'
import MemberPicker from '../../../../_components/MemberPicker'
import { useServiceTaskUpdate } from '@/hooks/useServiceTaskUpdate'

export default function TaskProject({
  taskId,
  projectId,
  className,
  noName = false
}: {
  taskId: string
  projectId: string
  className?: string
  noName?: boolean
}) {
  const { projects } = useProjectStore()

  const projectName = projects.find(project => project.id === projectId)?.name

  const classes = ['task-assignee']

  className && classes.push(className)
  noName && classes.push('no-name')

  return <div>{projectName}</div>
}
