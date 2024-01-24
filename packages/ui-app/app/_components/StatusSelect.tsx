import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
import { useProjectStatusStore } from '../../store/status'

const List = Form.List

interface IStatusSelectProps {
  value?: string
  className?: string
  onChange?: (v: string) => void
  title?: string
  placeholder?: string
}

const defaultOption: ListItemValue = {
  id: '0',
  title: ''
}

export default function StatusSelect({
  title,
  className,
  value,
  onChange,
  placeholder
}: IStatusSelectProps) {
  // const selectOption = options.find(opt => opt.id === value);
  const { statuses } = useProjectStatusStore()
  const [options, setOptions] = useState<ListItemValue[]>([])
  const [val, setVal] = useState(defaultOption)
  const [updateCounter, setUpdateCounter] = useState(0)

  useEffect(() => {
    if (statuses.length) {
      setOptions(statuses.map(p => ({ id: p.id + '', title: p.name + '' })))
    }
  }, [statuses])

  useEffect(() => {
    if (statuses.length) {
      const selectedStatus = statuses.find(opt => opt.id === value)
      selectedStatus &&
        setVal({ id: selectedStatus.id, title: selectedStatus.name })
    }
  }, [statuses, value])

  useEffect(() => {
    if (updateCounter) {
      onChange && onChange(val.id)
    }
  }, [updateCounter, val])

  const existingStatus = statuses.find(stt => stt.id === val.id)

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
            <div
              className="w-4 h-4 rounded cursor-pointer shrink-0"
              style={{
                backgroundColor: existingStatus?.color || '#e5e5e5'
              }}></div>
            <span className="status-title">
              {existingStatus?.name ? existingStatus.name : 'None'}
            </span>
          </div>
        </List.Button>
        <List.Options minWidth={170}>
          {options.map(option => {
            const stt = statuses.find(st => st.id === option.id)
            return (
              <List.Item key={option.id} value={option}>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{ backgroundColor: stt?.color }}></div>
                  <span>{option.title}</span>
                </div>
              </List.Item>
            )
          })}
        </List.Options>
      </List>
    </div>
  )
}
