import Badge from '@/components/Badge'
import VisionViewMode from './VisionViewMode'
import VisionMonthNavigator from './VisionMonthNavigator'

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
  const badgeColor = rate === 100 ? 'green' : rate === 0 ? 'red' : 'yellow'
  return (
    <div className="rounded-t-md bg-gray-50 dark:bg-gray-800">
      <div className="flex items-center justify-between px-3 py-2 text-xs">
        <div className="">
          <span className="uppercase text-[11px] font-bold text-gray-600">
            All goals: {total}
          </span>
          <div className="text-[11px] space-x-2 text-gray-400">
            <span className="capitalize">Done: {done}</span>
            <span className="capitalize">In progress: {inprogress}</span>
          </div>
        </div>
        <Badge title={`${rate} %`} color={badgeColor} />
      </div>
      <div className="px-3 pb-2 flex gap-2 items-center">
        <VisionMonthNavigator />
        <VisionViewMode />
      </div>
    </div>
  )
}
