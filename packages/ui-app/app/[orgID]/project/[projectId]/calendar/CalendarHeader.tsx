import { genAWeekOfDate } from "@shared/libs"
import { ICalendarView, useCalendarContext } from "./context"
import { isToday } from "date-fns"

export default function CalendarHeader() {
  const { calendarView } = useCalendarContext()
  const headerWeek = calendarView === ICalendarView.WEEK ? genAWeekOfDate(new Date()) : null
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return <div className="cal-week cal-header border-b dark:border-gray-700">
    {!headerWeek && dayHeaders.map(d => {
      return (
        <div className="cal-header-day" key={d}>
          {d}
        </div>
      )
    })}

    {headerWeek?.map(d => {
      const active = isToday(d) ? 'text-indigo-500 dark:text-pink-400' : ''
      return (
        <div className="cal-header-day" key={d.getTime()}>
          <span className={active ? 'text-gray-900 dark:text-gray-300' : ''}>
            {dayHeaders[d.getDay()]}
          </span>
          <div className={`text-xl font-bold text-gray-800 dark:text-gray-400 ${active}`}>
            {d.getDate()}
          </div>
        </div>
      )
    })}
  </div>
}
