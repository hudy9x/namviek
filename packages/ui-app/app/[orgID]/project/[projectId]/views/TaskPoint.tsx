import PointSelect from '../../../../_components/PointSelect'

export default function TaskPoint({
  taskId,
  value
}: {
  taskId: string
  value: number | null
}) {
  return <PointSelect className='task-point' value={value + ''} />
}
