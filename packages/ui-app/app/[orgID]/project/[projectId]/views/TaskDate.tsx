import { DatePickerBorderless } from '@shared/ui'
import { useEffect, useState } from 'react'
import { useTaskUpdate } from './useTaskUpdate'

export default function TaskDate({
  date,
  taskId,
  className
}: {
  date: Date | null
  taskId: string,
    className?: string
}) {
  const [value, setValue] = useState(date)
  const { updateTaskData } = useTaskUpdate()

  useEffect(() => {
    setValue(date)
  }, [date])

  if (!value) {
    return <div>-</div>
  }

  const onUpdate = (date: Date) => {
    const dueDate = date
    updateTaskData({
      id: taskId,
      dueDate
    })
  }

  return (
    <div className={`task-date ${className}`}>
      <DatePickerBorderless value={value} onChange={onUpdate} />
    </div>
  )
}
