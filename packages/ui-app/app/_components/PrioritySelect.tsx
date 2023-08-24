import { TaskPriority } from '@prisma/client'
import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
import { RiFlag2Fill } from 'react-icons/ri'

const List = Form.List

const colors = new Map()

colors.set(TaskPriority.URGENT, '#ff1345')
colors.set(TaskPriority.HIGH, '#ffce37')
colors.set(TaskPriority.NORMAL, '#13cfff')
colors.set(TaskPriority.LOW, '#ababab')
colors.set('ALL', 'rgb(223 223 223)')

const options: ListItemValue[] = [
  { id: TaskPriority.URGENT, title: 'Urgent' },
  { id: TaskPriority.HIGH, title: 'High' },
  { id: TaskPriority.NORMAL, title: 'Normal' },
  { id: TaskPriority.LOW, title: 'Low' },
  { id: 'ALL', title: 'All' }
]

interface IPriorityProps {
  all?: boolean
  value?: TaskPriority | 'ALL'
  width?: number
  className?: string
  onChange?: (v: TaskPriority) => void
  title?: string
  placeholder?: string
}

export default function PrioritySelect({
  title,
  width,
  all = false,
  className,
  value,
  onChange,
  placeholder
}: IPriorityProps) {
  const selectOption = options.find(opt => opt.id === value)

  const [val, setVal] = useState(selectOption || options[2])
  const [updateCounter, setUpdateCounter] = useState(0)

  useEffect(() => {
    if (updateCounter) {
      onChange && onChange(val.id as TaskPriority)
    }
  }, [updateCounter, val])

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
            <RiFlag2Fill
              className="text-gray-200"
              style={{ color: selectedColor }}
            />
            <span>{val.title ? val.title : 'None'}</span>
          </div>
        </List.Button>
        <List.Options width={width}>
          {options.map(option => {
            if (!all && option.id === 'ALL') return <></>
            const c = colors.get(option.id)
            return (
              <List.Item key={option.id} value={option}>
                <div className="flex items-center gap-2">
                  <RiFlag2Fill style={{ color: c }} />
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
