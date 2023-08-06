import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'

const List = Form.List
interface IListPresetProps {
  className?: string
  title?: string
  value?: string
  onChange?: (val: string) => void
  options: ListItemValue[]
}

const defaultValue = { id: 'NONE', title: 'Option' }

export default function ListPreset({
  title,
  className,
  value,
  onChange,
  options
}: IListPresetProps) {
  const selectedOption = options.find(opt => opt.id === value)
  const [val, setVal] = useState<ListItemValue>(selectedOption || defaultValue)
  const [updateCounter, setUpdateCounter] = useState(0)

  useEffect(() => {
    if (updateCounter > 0) {
      console.log('1')
      onChange && onChange(val.id)
    }
  }, [updateCounter])

  return (
    <div className={className}>
      <List
        title={title}
        value={val}
        onChange={val => {
          setVal(val)
          setUpdateCounter(updateCounter + 1)
        }}>
        <List.Button>{val.title}</List.Button>
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
