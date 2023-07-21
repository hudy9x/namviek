import PointSelect from '../../../../_components/PointSelect'
import { useTaskUpdate } from './useTaskUpdate'

export default function TaskPoint({
  taskId,
  value,
  className
}: {
  taskId: string
  value: number | null
  className?: string
}) {
  const { updateTaskData } = useTaskUpdate()
  const onUpdate = (point: string) => {
    const taskPoint = parseInt(point, 10)
    updateTaskData({
      id: taskId,
      taskPoint
    })
  }
  return (
    <PointSelect
      className={`task-point ${className}`}
      value={value + ''}
      onChange={onUpdate}
    />
  )
}
