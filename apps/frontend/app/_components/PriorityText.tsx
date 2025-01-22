import { TaskPriority } from '@prisma/client'
import { RiFlag2Fill } from 'react-icons/ri'

const colors = new Map()

colors.set(TaskPriority.URGENT, '#ff1345')
colors.set(TaskPriority.HIGH, '#ffce37')
colors.set(TaskPriority.NORMAL, '#13cfff')
colors.set(TaskPriority.LOW, '#ababab')
colors.set('ALL', 'rgb(223 223 223)')

export default function PriorityText({
  type,
  block = false
}: {
  type?: TaskPriority
  block?: boolean
}) {
  if (type === TaskPriority.LOW) return null
  const color = colors.get(type)
  return (
    <div
      className={`uppercase text-[10px] gap-1 items-center ${
        block ? 'flex' : 'inline-flex'
      }`}
      style={{ color }}>
      <RiFlag2Fill className="text-gray-200" style={{ color: color }} />
      {type}
    </div>
  )
}
