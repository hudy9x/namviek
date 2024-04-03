import { TaskType } from '@prisma/client'
import './icon.css'

const colors = new Map()

const defaultIcon =
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f418.png'
// 'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f438.png'
colors.set(TaskType.TASK, defaultIcon) // 🍚
colors.set(
  TaskType.BUG,
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f41e.png'
) // 🐞
colors.set(
  TaskType.NEW_FEATURE,
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/2b50.png'
) // ⭐
colors.set(
  TaskType.IMPROVEMENT,
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/2692-fe0f.png'
) // 🤖
colors.set(
  'ALL',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f38f.png'
) // 🎏
colors.set(
  'NONE',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f6ab.png'
) // 🚫

export const taskTypeColors = colors
export default function TaskTypeIcon({
  type,
  size
}: {
  type?: string
  size?: 'sm'
}) {
  const icon = taskTypeColors.get(type)
  let width = 'w-[20px] h-[20px]'
  if (size === 'sm') {
    width = 'w-[15px] h-[15px]'
  }

  if (!icon) {
    return (
      <div className={`task-type-icon ${width}`}>
        <img src={defaultIcon} alt="Task type icon" className="w-full h-full" />
      </div>
    )
  }

  return (
    <div className={`task-type-icon ${width}`}>
      <img src={icon} alt="Task type icon" className="w-full h-full" />
    </div>
  )
}
