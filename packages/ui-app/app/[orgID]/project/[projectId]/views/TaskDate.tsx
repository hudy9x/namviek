import { DatePickerBorderless } from '@shared/ui'
import { useEffect, useState } from 'react'
import { useTaskUpdate } from './useTaskUpdate'
import { differenceInDays } from 'date-fns'

export default function TaskDate({
  date,
  taskId,
  toNow = false,
  className
}: {
  date: Date | null
  taskId: string
  className?: string
  toNow?: boolean
}) {
  const [value, setValue] = useState(date)
  const { updateTaskData } = useTaskUpdate()

  useEffect(() => {
    setValue(date)
  }, [date])

  // if (!value) {
  //   return <div>-</div>
  // }

  const onUpdate = (date: Date) => {
    const dueDate = date
    updateTaskData({
      id: taskId,
      dueDate
    })
  }

  const classes: string[] = []

  className && classes.push(className)

  if (date && differenceInDays(new Date(date), new Date()) < 0) {
    classes.push('overdue')
  }

  return (
    <div className={`task-date ${classes.join(' ')}`}>
      <DatePickerBorderless
        toNow={toNow}
        value={value || undefined}
        placeholder="--/--/--"
        onChange={onUpdate}
      />
    </div>
  )
}
