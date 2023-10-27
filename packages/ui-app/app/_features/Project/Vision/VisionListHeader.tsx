import Badge from '@/components/Badge'
import ListPreset from '@/components/ListPreset'
import { useVisionContext } from './context'

export default function VisionListHeader({
  total,
  done,
  inprogress,
  rate
}: {
  total: number
  done: number
  inprogress: number
  rate: number
}) {
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

  const badgeColor = rate === 100 ? 'green' : rate === 0 ? 'red' : 'yellow'
  return (
    <div className="rounded-t-md bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between px-3 py-2 text-xs">
        <div className="">
          <span className="uppercase text-[11px] font-bold text-gray-600">
            All visions: {total}
          </span>
          <div className="text-[11px] space-x-2 text-gray-400">
            <span className="capitalize">Done: {done}</span>
            <span className="capitalize">In progress: {inprogress}</span>
          </div>
        </div>
        <Badge title={`${rate} %`} color={badgeColor} />
      </div>
      <div className="px-3 pb-2">
        <ListPreset
          value={currentMonth}
          onChange={v => {
            setFilter(prev => ({ ...prev, month: parseInt(v, 10) }))
          }}
          options={monthList}
        />
      </div>
    </div>
  )
}
