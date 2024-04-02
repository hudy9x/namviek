import { TaskType } from '@prisma/client'
import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
import { RiFlag2Fill } from 'react-icons/ri'
import TaskTypeIcon from './Icon'

const List = Form.List

const options: ListItemValue[] = [
  { id: TaskType.TASK, title: 'Task' },
  { id: TaskType.BUG, title: 'Bug' },
  { id: TaskType.NEW_FEATURE, title: 'New feature' },
  { id: TaskType.IMPROVEMENT, title: 'Improvement' },
  { id: 'ALL', title: 'All' }
  // { id: 'NONE', title: 'None' }
]

const colors = new Map()

colors.set(
  TaskType.TASK,
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f358.png'
) // 🍘
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
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f916.png'
) // 🤖
colors.set(
  'ALL',
  'https://cdn.jsdelivr.net/npm/emoji-datasource-twitter/img/twitter/64/1f38f.png'
) // 🎏

export const taskTypeColors = colors
export const taskTypeOptions = options

interface ITaskTypeProps {
  all?: boolean
  value?: TaskType | 'ALL'
  width?: number
  className?: string
  onChange?: (v: TaskType) => void
  title?: string
  placeholder?: string
}

export default function TaskTypeSelect({
  title,
  width,
  all = false,
  className,
  value,
  onChange,
  placeholder
}: ITaskTypeProps) {
  const selectOption = options.find(opt => opt.id === value)

  const [val, setVal] = useState(selectOption || options[0])
  const [updateCounter, setUpdateCounter] = useState(0)

  useEffect(() => {
    if (updateCounter) {
      onChange && onChange(val.id as TaskType)
    }
  }, [updateCounter, val])

  useEffect(() => {
    if (selectOption) {
      setVal(selectOption)
    }
  }, [selectOption])

  const selectedColor = colors.get(val.id)

  return (
    <div className={className}>
      <List
        title={title}
        placeholder={placeholder}
        value={val}
        onChange={val => {
          setVal(val)
          setUpdateCounter(updateCounter + 1)
        }}>
        <List.Button>
          <div className="flex items-center gap-2">
            {/* <RiFlag2Fill */}
            {/*   className="text-gray-200" */}
            {/*   style={{ color: selectedColor }} */}
            {/* /> */}
            <TaskTypeIcon icon={selectedColor} />
            <span>{val.title ? val.title : 'None'}</span>
          </div>
        </List.Button>
        <List.Options width={width}>
          {options.map(option => {
            if (!all && option.id === 'ALL') return null
            const c = colors.get(option.id)
            return (
              <List.Item key={option.id} value={option}>
                <div className="flex items-center gap-2">
                  <TaskTypeIcon icon={c} />
                  {option.title}
                </div>
              </List.Item>
            )
          })}
        </List.Options>
      </List>
    </div>
  )
}
