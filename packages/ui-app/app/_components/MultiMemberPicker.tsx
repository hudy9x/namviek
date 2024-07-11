import { getGoalieUser } from '@goalie/nextjs'
import { UserMember, useMemberStore } from '../../store/member'
import { Avatar, Form, ListItemValue } from '@shared/ui'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
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

function SelectedMembers({
  selected,
  members,
  compact
}: {
  selected: ListItemValue[]
  members: UserMember[]
  compact?: boolean
}) {

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

function useRefactorMemberOptions({ all, setOptions }:
  {
    all?: boolean,
    setOptions: Dispatch<SetStateAction<ListItemValue[]>>
  }) {
  const { members } = useMemberStore(state => state)
  // update project member into list
  useEffect(() => {
    const user = getGoalieUser()
    const listMembers = members.map(mem => {
      let title = mem.name
      if (user?.id === mem.id) {
        title = 'Me'
      }

      return { id: mem.id, title }
    })
    all && listMembers.push({ id: 'ALL', title: 'All member' })

    defaultAssigneeArr = listMembers as ListItemValue[]
    setOptions(listMembers as ListItemValue[])
  }, [members])

}

function useOnUserChangeOption({ onChange, val }: {
  onChange?: (val: string[]) => void
  val: ListItemValue[]
}) {
  const [updateCounter, setUpdateCounter] = useState(0)

  // call onChange everytime user select an other assignee
  useEffect(() => {
    updateCounter > 0 &&
      onChange &&
      onChange(val.map(v => v.id).filter(m => m !== defaultAssignee.id))
  }, [updateCounter])

  const updateCounterHandler = () => {
    setUpdateCounter(updateCounter + 1)
  }

  return { updateCounterHandler }
}

function useSetSelectedVal({
  options,
  selectedOption,
  value,
  setVal
}: {
  selectedOption: ListItemValue[]
  options: ListItemValue[],
  value?: string[]
  setVal: Dispatch<SetStateAction<ListItemValue[]>>
}) {
  useEffect(() => {
    if (selectedOption) {
      setVal(selectedOption)
    }
  }, [value])

  useEffect(() => {
    const selectedMembers = options.filter(
      m => value && value.some(v => v === m.id)
    )
    selectedMembers.length ? setVal(selectedMembers) : setVal(defaultAssigneeArr)
  }, [options])
}

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

  const selectedOption = options.filter(
    opt => value && value.some(v => v === opt.id)
  )
  const [val, setVal] = useState(
    selectedOption.length ? selectedOption : [options[0]]
  )

  const { updateCounterHandler } = useOnUserChangeOption({ onChange, val })

  // update project member into list
  useRefactorMemberOptions({ setOptions, all })

  useSetSelectedVal({
    selectedOption,
    options,
    setVal,
    value
  })

  return (
    <div className={className}>
      <List
        multiple
        title={title}
        value={val}
        onMultiChange={val => {
          setVal(val)
          // setUpdateCounter(updateCounter + 1)
          updateCounterHandler()
        }}>
        {/* <List.Button>{getSelectedMember(val)}</List.Button> */}
        <List.Button>
          <SelectedMembers selected={val} members={members} compact={compact} />
        </List.Button>
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
