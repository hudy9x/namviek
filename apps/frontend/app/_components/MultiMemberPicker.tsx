import { getGoalieUser } from '@auth-client'
import { UserMember, useMemberStore } from '../../store/member'
import { Avatar, Form, ListItemValue } from '@ui-components'
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
const List = Form.List

interface IMemberPicker {
  className?: string
  all?: boolean
  compact?: boolean
  title?: string
  value?: string[]
  onChange?: (val: string[]) => void
  displayedOptions?: string[]
}

const defaultAssignee: ListItemValue = { id: 'NONE', title: 'No assignee' }

const SelectedMembers = ({ selected, members, compact }: { selected: ListItemValue[], members: ListItemValue[], compact?: boolean }) => {
  const selectedMembers = members.filter(m => selected.some(s => s.id === m.id))

  if (selected.find(s => s.id === 'ALL')) {
    return <MemberDisplay name="ALL" />
  }

  if (!selectedMembers.length) {
    return <MemberDisplay name="None" />
  }

  const displayedMembers = selectedMembers.slice(-3).reverse()
  const additionalCount = selectedMembers.length - displayedMembers.length

  return (
    <>
      {displayedMembers.map(sm => <MemberDisplay key={sm.id} name={sm.title || ''} photo={sm.icon || ''} compact={compact} />)}
      {additionalCount > 0 && <AdditionalMembers count={additionalCount} />}
    </>
  )
}

const MemberDisplay = ({ name, photo, compact }: { name: string, photo?: string, compact?: boolean }) => (
  <div className="flex gap-2 items-center shrink-0 selected-member">
    <Avatar name={name} size="sm" src={photo || ''} />
    {!compact && <span className="name">{name}</span>}
  </div>
)

const AdditionalMembers = ({ count }: { count: number }) => (
  <div title={`and ${count} more`} className="more flex gap-2 items-center justify-center shrink-0 selected-member w-6 h-6 bg-gray-100 rounded-full">
    +{count}
  </div>
)

const useMemberOptions = (all: boolean) => {
  const { members } = useMemberStore(state => state)
  const [options, setOptions] = useState<ListItemValue[]>([defaultAssignee])

  useEffect(() => {
    const user = getGoalieUser()
    const listMembers: ListItemValue[] = members.map(mem => ({
      id: mem.id,
      icon: mem.photo || '',
      title: user?.id === mem.id ? 'Me' : (mem.name || '')
    }))
    if (all) listMembers.push({ id: 'ALL', title: 'All members' })

    setOptions(listMembers)
  }, [members, all])

  return options
}

const useSelectedMembers = (options: ListItemValue[], value: string[], onChange: (val: string[]) => void) => {
  const [selected, setSelected] = useState<ListItemValue[]>([])

  useEffect(() => {
    const selectedMembers = options.filter(option => value.includes(option.id))
    setSelected(selectedMembers.length ? selectedMembers : [defaultAssignee])
  }, [options, value])

  const handleSelectionChange = (val: SetStateAction<ListItemValue[]>) => {
    setSelected(prevSelected => {
      const newSelected = typeof val === 'function' ? val(prevSelected) : val
      onChange(newSelected.map(v => v.id).filter(id => id !== defaultAssignee.id))
      return newSelected
    })
  }

  return { selected, handleSelectionChange }
}

export default function MultiMemberPicker({
  title,
  all = false,
  compact = false,
  onChange,
  value,
  className,
  displayedOptions
}: IMemberPicker) {
  const options = useMemberOptions(all)
  const filteredOptions = useMemo(() => {
    if (!displayedOptions || !displayedOptions.length) return options
    return options.filter(option => displayedOptions.includes(option.id))
  }, [options, displayedOptions])
  const { selected, handleSelectionChange } = useSelectedMembers(options, value || [], onChange || (() => { console.log(1) }))

  return (
    <div className={className}>
      <List
        multiple
        title={title}
        value={selected}
        onMultiChange={handleSelectionChange}>
        <List.Button>
          <SelectedMembers selected={selected} members={options} compact={compact} />
        </List.Button>
        <List.Options width={200}>
          {filteredOptions.map(option => (
            <List.Item keepMeOnly={option.id === 'ALL'} key={option.id} value={option}>
              <div className="flex gap-2.5 items-center">
                <Avatar src={option.icon || ''} size="md" name={option.title || ''} />
                {option.title}
              </div>
            </List.Item>
          ))}
        </List.Options>
      </List>
    </div>
  )
}
