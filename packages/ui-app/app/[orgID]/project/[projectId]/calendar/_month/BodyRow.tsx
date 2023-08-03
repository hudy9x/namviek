import { useCallback, useContext, useState } from 'react'
import MonthCell from './MonthCell'
import { PseudoTask } from './types'
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays'

export default function BodyRow({
  tasks,
  dates
}: {
  tasks: PseudoTask[]
  dates: Date[]
}) {
  const [moreTaskShown, setMoreTaskShown] = useState<boolean>(true)
  const isTaskOnDate = useCallback((task: PseudoTask, date: Date) => {
    const taskStartDate = task.pseudoStartedDate
    const taskDueDate = task.dueDate
    if (!taskStartDate || !taskDueDate) return false

    return (
      differenceInCalendarDays(taskStartDate, date) <= 0 &&
      differenceInCalendarDays(date, taskDueDate) <= 0
    )
  }, [])

  const toggleShowHideHandle = useCallback(() => {
    setMoreTaskShown(pre => !pre)
  }, [])
  return (
    <div className="grid grid-cols-7">
      {dates.map((date, i) => {
        const cellTasks = tasks.filter(task => isTaskOnDate(task, date))
        return (
          <MonthCell
            moreTaskShown={moreTaskShown}
            toggleShowHideHandle={toggleShowHideHandle}
            date={date}
            key={i}
            tasks={cellTasks}
          />
        )
      })}
    </div>
  )
}
