import { useMemberStore } from '../../store/member'
import { Avatar, Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
const List = Form.List

interface IMemberPicker {
  multiple?: boolean
  className?: string
  title?: string
  value?: string
  onChange?: (val: string) => void
}

const defaultAssignee = { id: 'NONE', title: 'No assignee' }

export default function MemberPicker({
  title,
  onChange,
  value,
  className,
  multiple = false
}: IMemberPicker) {
  const { members } = useMemberStore(state => state)
  const [options, setOptions] = useState<ListItemValue[]>([defaultAssignee])
  const selectedOption = options.find(opt => opt.id === value)
  const [val, setVal] = useState(selectedOption ? selectedOption : options[0])
  const [updateCounter, setUpdateCounter] = useState(0)

  // update project member into list
  useEffect(() => {
    const listMembers = members.map(mem => ({ id: mem.id, title: mem.name }))
    setOptions(listMembers as ListItemValue[])
  }, [members])
  
  useEffect(() => {
    if (selectedOption) {
      setVal(selectedOption)
    }
  }, [value])

  useEffect(() => {
    const selectedMember = options.find(m => value === m.id)
    if (selectedMember) {
      setVal(selectedMember)
    } else {
      setVal(defaultAssignee)
    }
  }, [options])

  // call onChange everytime user select an other assignee
  useEffect(() => {
    if (updateCounter > 0 && onChange) {
      onChange(val.id)
    }
  }, [updateCounter])

  const getSelectedMember = (selected: ListItemValue) => {
    const selectedMember = members.find(m => selected.id === m.id)
    if (!selectedMember) {
      return (
        <div className="flex gap-2 items-center shrink-0 px-2 py-1.5 border rounded-md bg-gray-50 selected-member-item">
          <Avatar name={'None'} size="md" src={''} />{' '}
          <span className="selected-member-name">No one</span>
        </div>
      )
    }

    const { name, photo } = selectedMember
    return (
      <div
        title={name || ''}
        className="flex gap-2 items-center shrink-0 px-2 py-1.5 border rounded-md bg-gray-50 selected-member-item">
        <Avatar name={name || ''} size="md" src={photo || ''} />{' '}
        <span className="selected-member-name truncate">
          {name ? name : 'None'}
        </span>
      </div>
    )
  }

  return (
    <div className={`${className} member-picker`}>
      <List
        title={title}
        value={val}
        onChange={val => {
          setVal(val)
          setUpdateCounter(updateCounter + 1)
        }}>
        <List.Button>{getSelectedMember(val)}</List.Button>
        <List.Options>
          {options.map(option => {
            const member = members.find(m => m.id === option.id)
            return (
              <List.Item key={option.id} value={option}>
                <div className="flex gap-2.5 items-center">
                  <Avatar
                    src={member && member.photo ? member.photo : ''}
                    size="md"
                    name={option.title || ''}
                  />
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
