import { Form, ListItemValue } from '@shared/ui'
import { useProjectPointStore } from 'packages/ui-app/store/point'
import { useEffect, useState } from 'react'
import { AiOutlineStar } from 'react-icons/ai'

const List = Form.List

interface IPointSelectProps {
  zero?: boolean
  infinite?: boolean
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
  zero = false,
  infinite = false,
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
    if (value && options.length) {
      const newOption = options.find(opt => opt.id === value)
      newOption && setVal(newOption)
    }
  }, [value, options])

  useEffect(() => {
    if (points.length) {
      const newPoints = points.map(p => ({
        id: p.point + '',
        title: p.point + ''
      }))
      zero && newPoints.push({ id: '0', title: '∅' })
      infinite && newPoints.push({ id: '-1', title: '∞' })
      setOptions(newPoints)
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
          <div className="relative w-5">
            <AiOutlineStar className="w-4 dark:text-gray-300 text-gray-500 h-4 shrink-0" />
            {val.title ? (
              <span className="absolute -top-1.5 left-2.5 w-4 h-4 text-[10px] flex items-center justify-center rounded-full bg-orange-200 dark:text-gray-900">
                {val.title ? val.title : ''}
              </span>
            ) : null}
          </div>
        </List.Button>
        <List.Options width={100}>
          {options.map(option => {
            return (
              <List.Item key={option.id} value={option}>
                <div className="flex items-center gap-2 text-gray-500">
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
