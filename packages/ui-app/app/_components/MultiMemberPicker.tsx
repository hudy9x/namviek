import { useMemberStore } from '../../store/member'
import { Avatar, Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
const List = Form.List

interface IMemberPicker {
  className?: string
  all?: boolean
  compact?: boolean
  title?: string
  value?: string[]
  onChange?: (val: string[]) => void
}

const defaultAssignee: ListItemValue = { id: 'NONE', title: 'No assignee' }
let defaultAssigneeArr: ListItemValue[] = [defaultAssignee]

export default function MultiMemberPicker({
  title,
  all = false,
  compact = false,
  onChange,
  value,
  className
}: IMemberPicker) {
  const { members } = useMemberStore(state => state)
  const [options, setOptions] = useState<ListItemValue[]>(defaultAssigneeArr)

  console.log('options.lenght', options.length)

  const selectedOption = options.filter(
    opt => value && value.some(v => v === opt.id)
  )
  const [val, setVal] = useState(
    selectedOption.length ? selectedOption : [options[0]]
  )
  const [updateCounter, setUpdateCounter] = useState(0)

  // update project member into list
  useEffect(() => {
    const listMembers = members.map(mem => ({ id: mem.id, title: mem.name }))
    all && listMembers.push({ id: 'ALL', title: 'All member' })

    defaultAssigneeArr = listMembers as ListItemValue[]
    setOptions(listMembers as ListItemValue[])
  }, [members])

  useEffect(() => {
    const selectedMembers = options.filter(
      m => value && value.some(v => v === m.id)
    )
    selectedMembers.length ? setVal(selectedMembers) : setVal(defaultAssigneeArr)
  }, [options])

  // call onChange everytime user select an other assignee
  useEffect(() => {
    updateCounter > 0 &&
      onChange &&
      onChange(val.map(v => v.id).filter(m => m !== defaultAssignee.id))
  }, [updateCounter])

  const getSelectedMember = (selected: ListItemValue[]) => {
    const selectedMembers = members.filter(m =>
      selected.some(s => s.id === m.id)
    )

    if (selected.find(s => s.id === 'ALL')) {
      return (
        <div className="flex gap-2 items-center shrink-0 selected-member">
          <Avatar name={'ALL'} size="sm" src={''} /> All
        </div>
      )
    }


    if (!selectedMembers.length) {
      return (
        <div className="flex gap-2 items-center shrink-0 selected-member">
          <Avatar name={'None'} size="sm" src={''} /> No one
        </div>
      )
    }

    const reverseMembers = selectedMembers.reverse().slice(0, 3)
    const TheFirstThreeItem = reverseMembers.map(sm => {
      return (
        <div
          key={sm.id}
          className="flex gap-2 items-center shrink-0 selected-member">
          <Avatar name={sm.name || ''} size="sm" src={sm.photo || ''} />{' '}
          {compact ? null : (
            <span className="name">{sm && sm.name ? sm.name : 'None'}</span>
          )}
        </div>
      )
    })

    const n = selectedMembers.length - reverseMembers.length
    const Rest = (
      <div
        title={`and ${n} more`}
        className="flex gap-2 items-center justify-center shrink-0 selected-member w-6 h-6 bg-gray-100 rounded-full">
        +{n}
      </div>
    )

    return (
      <>
        {TheFirstThreeItem}{' '}
        {reverseMembers.length < selectedMembers.length ? Rest : null}
      </>
    )
  }

  return (
    <div className={className}>
      <List
        multiple
        title={title}
        value={val}
        onMultiChange={val => {
          setVal(val)
          setUpdateCounter(updateCounter + 1)
        }}>
        <List.Button>{getSelectedMember(val)}</List.Button>
        <List.Options width={200}>
          {options.map(option => {
            const user = members.find(m => m.id === option.id)
            return (
              <List.Item keepMeOnly={option.id === 'ALL'} key={option.id} value={option}>
                <div className="flex gap-2.5 items-center">
                  <Avatar
                    src={user?.photo || ''}
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
