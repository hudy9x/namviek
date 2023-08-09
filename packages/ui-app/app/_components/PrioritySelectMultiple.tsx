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

const options: ListItemValue[] = [
  { id: TaskPriority.URGENT, title: 'Urgent' },
  { id: TaskPriority.HIGH, title: 'High' },
  { id: TaskPriority.NORMAL, title: 'Normal' },
  { id: TaskPriority.LOW, title: 'Low' }
]

interface IPriorityProps {
  value?: TaskPriority[]
  className?: string
  onChange?: (v: TaskPriority[]) => void
  title?: string
  placeholder?: string
}

export default function PrioritySelectMultiple({
  title,
  className,
  value,
  onChange,
  placeholder
}: IPriorityProps) {
  const selectedOptions = options.filter(opt => {
    if (!value || !value.length) return false

    return value.some(v => v === opt.id)
  })

  const [val, setVal] = useState(selectedOptions || [options[3]])
  const [updateCounter, setUpdateCounter] = useState(0)

  useEffect(() => {
    if (updateCounter) {
      onChange && onChange(val.map(v => v.id) as TaskPriority[])
    }
  }, [updateCounter, val])

  return (
    <div className={className}>
      <List
        title={title}
        multiple
        placeholder={placeholder}
        value={val}
        onMultiChange={val => {
          setVal(val)
          setUpdateCounter(updateCounter + 1)
        }}>
        <List.Button>
          <div className="flex items-center gap-2">
            {!val || !val.length ? (
              <span className="text-transparent">None</span>
            ) : null}
            {val.map(p => {
              const color = colors.get(p.id)
              return (
                <div key={p.id} className="flex items-center gap-2">
                  <RiFlag2Fill style={{ color }} />
                  {p.title}
                </div>
              )
            })}
          </div>
        </List.Button>
        <List.Options>
          {options.map(option => {
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
