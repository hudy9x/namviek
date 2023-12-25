import { dateFormat } from '@shared/libs'

let prevDate = ''
export default function ActivitySectionTime({
  time,
  visible = true
}: {
  time: Date
  visible?: boolean
}) {
  const dateString = dateFormat(new Date(time), 'iiii, dd MMM yy')

  const render = (txt: string) => (
    <div
      className={`relative text-gray-900 text-center uppercase text-[10px] mt-5 mb-2 ${
        visible ? '' : 'hidden'
      }`}>
      <span className="bg-white px-1 relative z-10">{txt}</span>
      <div className="h-[1px] top-1/2 bg-gray-200 absolute left-0 w-full"></div>
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
