import { Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
import { useProjectStatusStore } from '../../store/status'
import { useServiceOrgList } from '@/hooks/useServiceOrgList'

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

export default function OrganizationSelect({
  title,
  className,
  value,
  onChange,
  placeholder
}: IStatusSelectProps) {
  const { statuses } = useProjectStatusStore()
  // const [options, setOptions] = useState<ListItemValue[]>([])
  const [val, setVal] = useState<ListItemValue>(defaultOption)
  const [updateCounter, setUpdateCounter] = useState(0)

  const options = useServiceOrgList()

  useEffect(() => {
    if (options.length) {
      const selectedOrg = options.find(opt => opt.id === value)
      selectedOrg && setVal(selectedOrg)
    }
  }, [options, value])

  useEffect(() => {
    if (updateCounter) {
      onChange && onChange(val.id)
    }
  }, [updateCounter, val])

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
        <List.Button>Test</List.Button>
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
