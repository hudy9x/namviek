import { genCalendarArr } from '@shared/libs'
import CalMonthCell from './CalMonthCell'
import { DragDropContext } from 'react-beautiful-dnd'
import useCalendarAction from './useCalendarAction'
import { useTaskStore } from '@/store/task'
import { Loading } from '@shared/ui'

interface ICalMonthContainerProps {
  date: Date
}

export default function CalMonthContainer({ date }: ICalMonthContainerProps) {
  const calendars = genCalendarArr(date)
  const { onDragEnd } = useCalendarAction()
  const { taskLoading } = useTaskStore()
  const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="cal-week cal-header border-b dark:border-gray-700">
        {dayHeaders.map(d => {
          return (
            <div className="cal-header-day" key={d}>
              {d}
            </div>
          )
        })}
      </div>
      <div
        className="flex flex-col justify-between divide-y dark:divide-gray-700 relative"
        style={{ height: 'calc(100vh - 153px)' }}>
        <Loading.Absolute enabled={taskLoading} border />
        {calendars.map((week, weekIndex) => {
          return (
            <div
              className="grid grid-cols-7 h-full divide-x dark:divide-gray-700"
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
