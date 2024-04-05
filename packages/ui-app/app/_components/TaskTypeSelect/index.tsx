import { TaskType } from '@prisma/client'
import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
import TaskTypeIcon, { taskTypeColors } from './Icon'

const List = Form.List

const options: ListItemValue[] = [
  { id: TaskType.TASK, title: 'Task' },
  { id: TaskType.BUG, title: 'Bug' },
  { id: TaskType.NEW_FEATURE, title: 'New feature' },
  { id: TaskType.IMPROVEMENT, title: 'Improvement' },
  { id: 'ALL', title: 'All' },
  { id: 'NONE', title: 'None' }
]

export const taskTypeOptions = options

interface ITaskTypeProps {
  all?: boolean
  value?: TaskType | 'ALL' | 'NONE'
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
          <div title={val.title} className="flex items-center gap-2">
            <TaskTypeIcon type={val.id} />
            <span>{val.title ? val.title : 'None'}</span>
          </div>
        </List.Button>
        <List.Options width={width}>
          {options.map(option => {
            if (!all && option.id === 'ALL') return null

            return (
              <List.Item key={option.id} value={option}>
                <div className="flex items-center gap-2">
                  <TaskTypeIcon type={option.id} />
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
