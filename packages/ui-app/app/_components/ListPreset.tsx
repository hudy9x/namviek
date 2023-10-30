import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState, memo } from 'react'

const List = Form.List
interface IListPresetProps {
  className?: string
  title?: string
  width?: number
  error?: string
  value?: string
  defaultOption?: ListItemValue
  onChange?: (val: string) => void
  options: ListItemValue[]
}

const defaultValue = { id: 'NONE', title: 'Option' }

function ListPreset({
  title,
  width,
  error,
  className,
  value,
  onChange,
  defaultOption,
  options
}: IListPresetProps) {
  const selectedOption = options.find(opt => opt.id === value)
  const [val, setVal] = useState<ListItemValue>(
    selectedOption || defaultOption || defaultValue
  )
  const [updateCounter, setUpdateCounter] = useState(0)

  useEffect(() => {
    if (updateCounter > 0) {
      onChange && onChange(val.id)
    }
  }, [updateCounter])

  useEffect(() => {
    const selected = options.find(opt => opt.id === value)
    if (selected && selected.id !== val.id) setVal(selected)
  }, [value])

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
        <List.Button>
          <span className="whitespace-nowrap">
            {val.icon ? <span className="pr-1">{val.icon}</span> : null}
            {selectedVal.title}
          </span>
        </List.Button>
        <List.Options width={width}>
          {options.map(opt => {
            return (
              <List.Item key={opt.id} value={opt}>
                <>
                  {opt.icon ? (
                    <span className="w-[20px] inline-flex self-center justify-center pr-2">
                      {opt.icon}
                    </span>
                  ) : null}
                  {opt.title}
                </>
              </List.Item>
            )
          })}
        </List.Options>
      </List>
    </div>
  )
}

export default memo(ListPreset)
