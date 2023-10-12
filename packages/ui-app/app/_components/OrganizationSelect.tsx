/* eslint-disable @next/next/no-img-element */
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
  const [options, setOptions] = useState<ListItemValue[]>([])
  const [val, setVal] = useState<ListItemValue>(defaultOption)
  const [updateCounter, setUpdateCounter] = useState(0)

  const organizationList = useServiceOrgList()

  useEffect(() => {
    if(organizationList.length) {
      setOptions(organizationList.map( p => ({id: p.id.toString(), title: p.name})))
    }
  }, [organizationList])


  useEffect(() => {
    if (options.length) {
      const selectedOrg = options.find(opt => opt.id === value)
      selectedOrg && setVal(selectedOrg)
    }
  }, [options, value])

  useEffect(() => {
    if (updateCounter && onChange) {
      onChange(val.id)
    }
  }, [updateCounter, val])

  const existingOrg = organizationList.find(opt => opt.id === val.id)

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
            <img
              alt="organization avatar"
              className="w-4 h-4 rounded-md cursor-pointer"
              src={existingOrg?.avatar ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Vanamo_Logo.png/600px-Vanamo_Logo.png?20120915115534"}
            />
            <span>{existingOrg?.name ?? 'No Organization'}</span>
          </div>
        </List.Button>
        <List.Options>
          {options.map(option => {
            const orgs = organizationList.find(org => org.id === option.id)
            return (
              <List.Item key={option.id} value={option}>
                <div className="flex items-center gap-2">
                  <img
                    alt="organization avatar"
                    className="w-4 h-4 rounded-md cursor-pointer"
                    src={orgs?.avatar ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Vanamo_Logo.png/600px-Vanamo_Logo.png?20120915115534"}
                  />
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
