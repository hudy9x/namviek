import { format } from 'date-fns'
import { Droppable } from 'react-beautiful-dnd'
import CalMonthTaskList from './CalMonthTaskList'
import CalendarTaskCreate from './CalendarTaskCreate'

interface ICalMonthDay {
  day: Date
}
export default function CalMonthDay({ day }: ICalMonthDay) {
  const today = new Date()
  const month = today.getMonth()

  const dMonth = day.getMonth()

  const notInMonth = month !== dMonth
  const isToday = day.getDate() === today.getDate() && month === dMonth
  const classes = ['calendar-day']

  !notInMonth ? classes.push('bg-white') : classes.push('not-in-month')
  isToday && classes.push('today')

  return (
    <Droppable droppableId={day.toDateString()} type="date">
      {provided => (
        <div
          className={classes.join(' ')}
          {...provided.droppableProps}
          ref={provided.innerRef}>
          <span className="day-display">{format(day, 'dd')}</span>
          <CalMonthTaskList day={day} />
          {provided.placeholder}
          <CalendarTaskCreate dueDate={day} />
        </div>
      )}
    </Droppable>
  )
}
