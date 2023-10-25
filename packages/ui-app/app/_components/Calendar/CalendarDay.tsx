import { ReactNode } from 'react'

export default function CalendarDay({
  day,
  currentMonth,
  child
}: {
  day: Date
  currentMonth: number
  child: (day: Date) => ReactNode
}) {
  const month = currentMonth
  const today = new Date()
  const dMonth = day.getMonth()
  const d = day.getDay()

  const notInMonth = month !== dMonth
  const isToday =
    day.getDate() === today.getDate() && month === new Date().getMonth()
  const isSunSat = d === 0 || d === 6
  const classes = ['cal-day-in-week']

  notInMonth && classes.push('not-in-month')
  isToday && classes.push('today')
  isSunSat && classes.push('is-sunsat')

  return (
    <div className={classes.join(' ')} key={day.getTime()}>
      <span className="cal-day">{day.getDate()}</span>
      {child(day)}
    </div>
  )
}
