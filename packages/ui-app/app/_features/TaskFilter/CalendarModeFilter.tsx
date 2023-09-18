import ListPreset from '@/components/ListPreset'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useTaskFilter } from './context'
import { useCalendarContext } from '../../[orgID]/project/[projectId]/calendar/context'
import { getMonthList } from '@shared/libs'

const CalendarFilter = () => {
  const { filter, setFilterValue } = useTaskFilter()
  const { month, setMonth } = useCalendarContext()
  const search = useSearchParams()
  const mode = search.get('mode')
  const isCalendarMode = mode === 'calendar'
  const { date } = filter

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
  )
}

export default CalendarFilter
