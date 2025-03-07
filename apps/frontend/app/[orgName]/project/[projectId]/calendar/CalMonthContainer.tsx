import { genAWeekOfDate, genCalendarArr } from '@namviek/core'
import CalMonthCell from './CalMonthCell'
import { DragDropContext } from 'react-beautiful-dnd'
import useCalendarAction from './useCalendarAction'
import { ICalendarView } from './context'
import CalendarHeader from './CalendarHeader'

interface ICalMonthContainerProps {
  type: ICalendarView
  date: Date
}

export default function CalMonthContainer({ date, type }: ICalMonthContainerProps) {
  const { onDragEnd } = useCalendarAction()

  let calendars: Date[][] = []
  let isWeekView = false

  if (type === ICalendarView.WEEK) {
    isWeekView = true
    const d = new Date()

    // NOTE: this line below will caused a re-render everytime user click on task and close task's popup
    // because new Date() will be returned a different value 

    // calendars = [genAWeekOfDate(new Date())]
    calendars = [genAWeekOfDate(new Date(d.getFullYear(), d.getMonth(), d.getDate()))]
  }
  //
  if (type === ICalendarView.MONTH) {
    calendars = genCalendarArr(date)
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <CalendarHeader />
      <div
        className={`calendar-wrapper ${isWeekView ? 'week-view' : ''}`}>
        {/* <Loading.Absolute enabled={taskLoading} border /> */}
        {calendars.map((week, weekIndex) => {
          return (
            <div
              className="calendar-week"
              key={weekIndex}>
              {week.map(day => {
                return <CalMonthCell key={day.getTime()} day={day} />
              })}
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
