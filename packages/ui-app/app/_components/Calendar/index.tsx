import { genCalendarArr } from '@shared/libs'
import CalendarDay from './CalendarDay'
import './style.css'
import { ReactNode, useMemo } from 'react'

interface ICalendarProps {
  date: Date
  children: (day: Date) => ReactNode
}

export default function Calendar({ date, children }: ICalendarProps) {
  const calendars = useMemo(() => genCalendarArr(date), [date.toString()])
  const currentMonth = date.getMonth()
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="calendar-container">
      <div className="cal-week cal-header">
        {dayHeaders.map(d => {
          return (
            <div className="cal-header-day" key={d}>
              {d}
            </div>
          )
        })}
      </div>
      {calendars.map((week, weekIndex) => {
        return (
          <div className="cal-week" key={weekIndex}>
            {week.map(day => {
              return (
                <CalendarDay
                  child={children}
                  currentMonth={currentMonth}
                  key={day.getTime()}
                  day={day}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
