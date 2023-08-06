import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
import { useProjectStatusStore } from '../../store/status'

const List = Form.List

interface IStatusSelectProps {
  value?: string[]
  className?: string
  onChange?: (v: string[]) => void
  title?: string
  placeholder?: string
}

const defaultOption: ListItemValue = {
  id: '0',
  title: 'None'
}

export default function StatusSelectMultiple({
  title,
  className,
  value,
  onChange,
  placeholder
}: IStatusSelectProps) {
  // const selectOption = options.find(opt => opt.id === value);
  const { statuses } = useProjectStatusStore()
  const [options, setOptions] = useState<ListItemValue[]>([])
  const selectedOption = options.filter(
    opt => value && value.some(v => v === opt.id)
  )
  const [val, setVal] = useState(
    selectedOption.length ? selectedOption : options[0] ? [options[0]] : []
  )
  const [updateCounter, setUpdateCounter] = useState(0)

  // update options list
  useEffect(() => {
    const statusList = statuses.map(stt => ({ id: stt.id, title: stt.name }))
    setOptions(statusList as ListItemValue[])
  }, [statuses])

  // fill selectetd value after statues list updated
  useEffect(() => {
    if (options.length) {
      const selectedOption = options.filter(
        opt => value && value.some(v => v === opt.id)
      )
      setVal(selectedOption)
    }
  }, [options, value])

  useEffect(() => {
    if (updateCounter > 0 && onChange) {
      const selectedArr = val.map(v => v.id)
      selectedArr && onChange(selectedArr)
    }
  }, [updateCounter])

  const selectedList = val

  return (
    <div className={className}>
      <List
        multiple
        title={title}
        placeholder={placeholder}
        value={val}
        onMultiChange={val => {
          setVal(val)
          setUpdateCounter(updateCounter + 1)
        }}>
        <List.Button>
          {!selectedList || !selectedList.length ? <span className='text-transparent'>Option</span>: null}
          <div className="flex flex-wrap items-center gap-2">
            {selectedList.map(item => {
              const stt = statuses.find(stt => stt.id === item.id)
              return (
                <div key={item.id} className="flex items-center gap-1">
                  <div
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{
                      backgroundColor: stt ? stt.color : '#e5e5e5'
                    }}></div>
                  <span className="status-title">{item.title}</span>
                </div>
              )
            })}
          </div>
        </List.Button>
        <List.Options>
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
