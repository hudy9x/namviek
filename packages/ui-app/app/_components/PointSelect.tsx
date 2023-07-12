import { Form, ListItemValue } from '@shared/ui'
import { useProjectPointStore } from 'packages/ui-app/store/point'
import { useEffect, useState } from 'react'
import { RiFlag2Fill } from 'react-icons/ri'
import { AiOutlineStar } from 'react-icons/ai'

const List = Form.List

interface IPointSelectProps {
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

export default function PointSelect({
  title,
  className,
  value,
  onChange,
  placeholder
}: IPointSelectProps) {
  // const selectOption = options.find(opt => opt.id === value);
  const { points } = useProjectPointStore()
  const [options, setOptions] = useState<ListItemValue[]>([])
  const [val, setVal] = useState(defaultOption)
  const [updateCounter, setUpdateCounter] = useState(0)
  // const [val, setVal] = useState(selectOption || options[2]);
  //
  //

  useEffect(() => {
    if (points.length) {
      setOptions(points.map(p => ({ id: p.point + '', title: p.point + '' })))
    }
  }, [points])

  useEffect(() => {
    if (updateCounter) {
      onChange && onChange(val.id)
    }
  }, [updateCounter, val])
  //
  // const selectedColor = colors.get(val.id);

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
            <AiOutlineStar className="w-4 shrink-0" />
            <span>{val.title ? val.title : ''}</span>
          </div>
        </List.Button>
        <List.Options>
          {options.map(option => {
            return (
              <List.Item key={option.id} value={option}>
                <div className="flex items-center gap-2">
                  <AiOutlineStar />
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
