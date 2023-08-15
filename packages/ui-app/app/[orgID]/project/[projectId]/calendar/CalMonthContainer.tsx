import { genCalendarArr } from '@shared/libs'
import CalMonthCell from './CalMonthCell'
import { DragDropContext } from 'react-beautiful-dnd'
import useCalendarAction from './useCalendarAction'

interface ICalMonthContainerProps {
  date: Date
}

export default function CalMonthContainer({ date }: ICalMonthContainerProps) {
  const calendars = genCalendarArr(date)
  const { onDragEnd } = useCalendarAction()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="flex flex-col justify-between divide-y"
        style={{ height: 'calc(100vh - 84px)' }}>
        {calendars.map((week, weekIndex) => {
          return (
            <div className="grid grid-cols-7 h-full divide-x" key={weekIndex}>
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
