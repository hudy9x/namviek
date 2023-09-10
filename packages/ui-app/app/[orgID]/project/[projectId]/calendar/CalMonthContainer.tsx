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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className="flex flex-col justify-between divide-y dark:divide-gray-700 relative"
        style={{ height: 'calc(100vh - 124px)' }}>
        {taskLoading ? (
          <div className="absolute top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-gray-50/50 backdrop-blur-sm">
            <div className="shadow-lg border px-5 py-3 bg-white rounded-md text-sm text-gray-500 flex items-center gap-3">
              <span className="w-4 h-4">
                <Loading />
              </span>
              <span>Loading ...</span>
            </div>
          </div>
        ) : null}
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
