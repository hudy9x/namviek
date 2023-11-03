import ListPreset from '@/components/ListPreset'
import { useTaskFilter } from '@/features/TaskFilter/context'
import { useVisionContext } from './context'

export default function VisionMonthNavigator() {
  const { setDateRangeByMonth } = useTaskFilter()
  const { filter, setFilter } = useVisionContext()
  const { month } = filter
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const d = new Date()
  const year = d.getFullYear()
  const currentMonth = month + ''
  const monthList = months.map(m => ({
    id: m + '',
    title: `${m > 9 ? m : `0${m}`}/${year}`
  }))

  return (
    <ListPreset
      className="w-full"
      value={currentMonth}
      onChange={v => {
        setDateRangeByMonth((parseInt(v, 10) - 1).toString())
        setFilter(prev => ({ ...prev, month: parseInt(v, 10) }))
      }}
      options={monthList}
    />
  )
}
