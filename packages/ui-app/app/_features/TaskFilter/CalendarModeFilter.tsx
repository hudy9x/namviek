import ListPreset from '@/components/ListPreset'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'
import { useTaskFilter } from './context'

const CalendarFilter = () => {
  const { filter, setFilterValue } = useTaskFilter()
  const [month, setMonth] = useState(new Date().getMonth())
  const search = useSearchParams()
  const mode = search.get('mode')
  const isCalendarMode = mode === 'calendar'

  const { date } = filter

  const months =
    'January, February, March, April, May, June, July, August, September, October, November, December'.split(
      ','
    )

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
    <div className="flex justify-center items-center gap-2 mr-10">
      <HiChevronLeft
        className="w-4 h-4 cursor-pointer"
        onClick={() => onChangeMonthCalendar(String(month - 1))}
      />
      <ListPreset
        className="w-[150px]"
        value={String(month)}
        onChange={val => onChangeMonthCalendar(val)}
        width={180}
        options={months.map((month, idx) => ({
          id: String(idx),
          title: month
        }))}
      />
      <HiChevronRight
        className="w-4 h-4 cursor-pointer"
        onClick={() => onChangeMonthCalendar(String(month + 1))}
      />
    </div>
  )
}

export default CalendarFilter
