import { dateFormat } from '@shared/libs'
import { HiOutlineCalendar } from 'react-icons/hi2'

let prevDate = ''
export default function ActivitySectionTime({
  time,
  visible = true,
  firstItem
}: {
  time: Date
  visible?: boolean
  firstItem?: boolean
}) {
  const dateString = dateFormat(new Date(time), 'iiii, dd MMM yy')

  const render = (txt: string) => (
    <div
      className={`relative text-gray-900 text-left uppercase text-[10px] ${
        firstItem ? 'mt-3' : 'mt-8'
      } mb-2 ${visible ? '' : 'hidden'}`}>
      <span className="bg-white dark:bg-gray-900 dark:text-gray-400 px-0.5 relative z-10 inline-flex items-center gap-2">
        <HiOutlineCalendar className="p-1 w-5 h-5 rounded-md border dark:border-gray-700 dark:text-gray-300 text-gray-500" />{' '}
        {txt}
      </span>
      <div className="h-[1px] top-1/2 bg-gray-100 dark:bg-gray-800 absolute left-0 w-full"></div>
    </div>
  )

  if (!prevDate) {
    prevDate = dateString
    return render(dateString)
  }

  if (prevDate === dateString) return null

  if (prevDate !== dateString) {
    prevDate = dateString
  }

  return render(dateString)
}
