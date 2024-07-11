import { UserMember, useMemberStore } from '@/store/member'
import { Avatar, Form, ListItemValue } from '@shared/ui'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import './style.css'
import { getGoalieUser } from '@goalie/nextjs'

const List = Form.List

interface IMemberPicker {
  multiple?: boolean
  className?: string
  showName?: boolean
  title?: string
  value?: string
  onChange?: (val: string) => void
}

const defaultAssignee = { id: 'NONE', title: 'No assignee' }

function SelectedMemberPicker({ selected, showName }: { selected: ListItemValue, showName?: boolean }) {
  const { members } = useMemberStore(state => state)

  const selectedMember = members.find(m => selected.id === m.id)
  if (!selectedMember) {
    return (
      <div className="flex gap-2 items-center shrink-0 px-2 py-1.5 border rounded-md bg-gray-50 selected-member-item">
        <Avatar name={'None'} size="md" src={''} />{' '}
        {showName ? (
          <span className="selected-member-name">No one</span>
        ) : null}
      </div>
    )
  }

  const user = getGoalieUser()
  const { name, photo, id } = selectedMember
  const userName = id === user?.id ? 'Me' : name

  return (
    <div
      title={name || ''}
      className="flex gap-2 items-center shrink-0 px-2 py-1.5 border rounded-md bg-gray-50 selected-member-item">
      <Avatar name={name || ''} size="md" src={photo || ''} />{' '}
      {showName ? (
        <span className="selected-member-name truncate">
          {userName ? userName : 'None'}
        </span>
      ) : null}
    </div>
  )
}

function useSetEmptyValue(setVal: Dispatch<SetStateAction<ListItemValue>>, value?: string) {
  // CASE: set an empty value
  useEffect(() => {
    setVal(prev => {
      if (prev && !value) {
        return { id: '', title: '' }
      }

      return prev
    })
  }, [value])

}

function useOnUserChangeOption({ onChange, val }: {
  onChange?: (val: string) => void,
  val: ListItemValue
}) {
  const [updateCounter, setUpdateCounter] = useState(0)

  useEffect(() => {
    if (updateCounter > 0 && onChange) {
      onChange(val.id)
    }
  }, [updateCounter])

  const updateCounterHandler = () => {
    setUpdateCounter(updateCounter + 1)
  }

  return { updateCounterHandler }
}


function useRefactorMemberOptions({ members, setOptions }: { members: UserMember[], setOptions: Dispatch<SetStateAction<ListItemValue[]>> }) {
  useEffect(() => {
    const user = getGoalieUser()
    const listMembers = members.map(mem => {

      let title = mem.name
      if (user?.id === mem.id) {
        title = 'Me'
      }

      return { id: mem.id, title }
    })
    setOptions(listMembers as ListItemValue[])
  }, [members])
}

function useUpdateValAsOptionsOrValueChange({
  selectedOption,
  setVal,
  value,
  options
}: {
  selectedOption?: ListItemValue,
  setVal: Dispatch<SetStateAction<ListItemValue>>,
  value?: string
  options: ListItemValue[]
}) {

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
}

export default function MemberPicker({
  title,
  showName = true,
  onChange,
  value,
  className,
  multiple = false
}: IMemberPicker) {

  const { members } = useMemberStore(state => state)
  const [options, setOptions] = useState<ListItemValue[]>([defaultAssignee])
  const selectedOption = options.find(opt => opt.id === value)
  const [val, setVal] = useState(selectedOption ? selectedOption : options[0])

  const { updateCounterHandler } = useOnUserChangeOption({ onChange, val })
  useSetEmptyValue(setVal, value)
  useRefactorMemberOptions({ setOptions, members })
  useUpdateValAsOptionsOrValueChange({
    selectedOption,
    setVal,
    value,
    options
  })

  return (
    <div className={`${className} member-picker`}>
      <List
        title={title}
        value={val}
        onChange={val => {
          setVal(val)
          // setUpdateCounter(updateCounter + 1)
          updateCounterHandler()
        }}>
        <List.Button>
          <SelectedMemberPicker selected={val} showName={showName} />
        </List.Button>
        <List.Options minWidth={200}>
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
