import StatusSelect from '../../../../_components/StatusSelect'

export default function TaskStatus({
  taskId,
  value
}: {
  taskId: string
  value: string
}) {
  return <StatusSelect className="task-status" value={value} />
}
