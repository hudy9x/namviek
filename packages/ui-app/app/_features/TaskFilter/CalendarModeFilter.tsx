import ListPreset from '@/components/ListPreset'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useTaskFilter } from './context'
import {
  ICalendarView,
  useCalendarContext
} from '../../[orgID]/project/[projectId]/calendar/context'
import { getMonthList } from '@shared/libs'
import useTaskFilterContext from './useTaskFilterContext'

const CalendarFilter = () => {
  const { filter, setFilterValue } = useTaskFilterContext()
  const { month, setMonth } = useCalendarContext()
  const search = useSearchParams()
  const { setCalendarView } = useCalendarContext()
  const mode = search.get('mode')
  const isCalendarMode = mode === 'calendar'
  const { date, status } = filter

  const months = getMonthList()

  const onChangeMonthCalendar = (month: string) => {
    const today = new Date()
    const lastDayOfMonth = new Date(today.getFullYear(), +month + 1, 0)
    const startDayOfMonth = new Date(today.getFullYear(), +month, 1)

    if (date !== 'date-range') setFilterValue('date', 'date-range')

    setFilterValue('startDate', startDayOfMonth)
    setFilterValue('endDate', lastDayOfMonth)

    setMonth(+month)
  }

  useEffect(() => {
    if (isCalendarMode) setMonth(new Date().getMonth())
  }, [isCalendarMode])

  return (
    <>
      <div className="flex items-center gap-2">
        <ListPreset
          className="no-clear-icon"
          value={ICalendarView.MONTH}
          onChange={val => {
            setCalendarView(val as ICalendarView)
          }}
          width={150}
          options={[
            { id: ICalendarView.WEEK, title: 'Week view' },
            { id: ICalendarView.MONTH, title: 'Month view' }
          ]}
        />
        {/* <div className='w-[1px] h-[20px] bg-gray-200 dark:bg-gray-700 mx-3'></div> */}
        {/* <ListPreset */}
        {/*   className='no-clear-icon' */}
        {/*   value={status} */}
        {/*   onChange={val => { */}
        {/*     setFilterValue('status', val) */}
        {/*   }} */}
        {/*   width={150} */}
        {/*   options={[ */}
        {/*     { id: 'TODO', title: 'Not Implemented' }, */}
        {/*     { id: 'INPROCESS', title: 'In Process' }, */}
        {/*     { id: 'DONE', title: 'Completed Tasks' }, */}
        {/*     { id: 'ALL', title: 'All Task' }, */}
        {/*   ]} /> */}
      </div>
      <div className="w-[1px] h-[20px] bg-gray-200 dark:bg-gray-700 mx-3"></div>
      <div className="calendar-filter flex justify-center items-center gap-2">
        <HiChevronLeft
          className="cal-btn"
          onClick={() => onChangeMonthCalendar(String(month - 1))}
        />
        <ListPreset
          className=""
          value={String(month)}
          onChange={val => onChangeMonthCalendar(val)}
          width={150}
          options={months.map((month, idx) => ({
            id: String(idx),
            title: month
          }))}
        />
        <HiChevronRight
          className="cal-btn"
          onClick={() => onChangeMonthCalendar(String(month + 1))}
        />
      </div>
    </>
  )
}

export default CalendarFilter
