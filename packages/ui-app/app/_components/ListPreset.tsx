import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'

const List = Form.List
interface IListPresetProps {
  className?: string
  title?: string
  error?: string
  value?: string
  defaultOption?: ListItemValue
  onChange?: (val: string) => void
  options: ListItemValue[]
}

const defaultValue = { id: 'NONE', title: 'Option' }

export default function ListPreset({
  title,
  error,
  className,
  value,
  onChange,
  defaultOption,
  options
}: IListPresetProps) {
  const selectedOption = options.find(opt => opt.id === value)
  const [val, setVal] = useState<ListItemValue>(selectedOption || defaultOption || defaultValue)
  const [updateCounter, setUpdateCounter] = useState(0)

  useEffect(() => {
    if (updateCounter > 0) {
      onChange && onChange(val.id)
    }
  }, [updateCounter])

  const selectedVal = val.id ? val : defaultOption || defaultValue

  return (
    <div className={className}>
      <List
        title={title}
        error={error}
        value={val}
        onChange={val => {
          setVal(val)
          setUpdateCounter(updateCounter + 1)
        }}>
        <List.Button>{selectedVal.title}</List.Button>
        <List.Options>
          {options.map(opt => {
            return (
              <List.Item key={opt.id} value={opt}>
                {opt.title}
              </List.Item>
            )
          })}
        </List.Options>
      </List>
    </div>
  )
}
