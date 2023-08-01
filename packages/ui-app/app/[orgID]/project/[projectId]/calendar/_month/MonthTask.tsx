import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import { PseudoDateTask } from './types'
import { useCallback } from 'react'
import { DragTransferData } from './types'

interface IMonthTask {
  task: PseudoDateTask
  date: Date
}

export default function MonthTask({ task, date }: IMonthTask) {
  const dragStartHandle = useCallback(
    (e: React.DragEvent<HTMLDivElement>, task: PseudoDateTask) => {
      const { clientX } = e
      const { x, width } = (e.target as HTMLElement).getBoundingClientRect()

      const firstDateOfWeekByTask =
        differenceInCalendarDays(task.pseudoStartedDate, startOfWeek(date)) > 0
          ? task.pseudoStartedDate
          : startOfWeek(date)

      const lastDateOfWeekByTask =
        differenceInCalendarDays(task.dueDate, endOfWeek(date)) > 0
          ? endOfWeek(date)
          : task.dueDate

      const taskDateDuration =
        differenceInCalendarDays(lastDateOfWeekByTask, firstDateOfWeekByTask) +
        1

      if (taskDateDuration < 1) {
        console.error('Wrong task date!')
        return
      }

      const diffDate = Math.floor(((clientX - x) / width) * taskDateDuration)
      const fromDate = new Date(firstDateOfWeekByTask)
      fromDate.setDate(fromDate.getDate() + diffDate)

      e.dataTransfer.setData(
        'text/plain',
        JSON.stringify({
          taskId: task.id,
          fromDateString: fromDate.toJSON()
        } as DragTransferData)
      )
      e.dataTransfer.effectAllowed = 'move'
    },
    [date]
  )

  return (
    <div className=" mb-1 w-full h-6 ">
      {differenceInCalendarDays(task.pseudoStartedDate, date) === 0 ||
      date.getDay() === 0 ? (
        <div
          draggable
          onDragStart={e => dragStartHandle(e, task)}
          style={{
            width: `${
              (7 - date.getDay() < differenceInCalendarDays(task.dueDate, date)
                ? 7 - date.getDay()
                : differenceInCalendarDays(task.dueDate, date) + 1) * 100
            }%`
          }}
          className={
            'relative bg-slate-400 z-20 overflow-hidden whitespace-nowrap text-ellipsis '
          }>
          {task.title}
        </div>
      ) : (
        <div className=" relative invisible box-border "></div>
      )}
    </div>
  )
}
