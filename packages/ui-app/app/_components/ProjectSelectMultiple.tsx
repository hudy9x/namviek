import { useProjectStore } from '@/store/project'
import { useMemberStore } from '../../store/member'
import { Avatar, Form, ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'
const List = Form.List

interface IProjectPicker {
  className?: string
  all?: boolean
  compact?: boolean
  title?: string
  value?: string[]
  onChange?: (val: string[]) => void
}

const defaultOption = { id: 'NONE', title: 'No project' }

export default function MultiProjectPicker({
  title,
  all = false,
  compact = false,
  onChange,
  value,
  className
}: IProjectPicker) {
  const fetchedOptions = useProjectStore(state => state.projects)
  const [options, setOptions] = useState<ListItemValue[]>([defaultOption])
  const selectedOption = options.filter(
    opt => value && value.some(v => v === opt.id)
  )
  const [val, setVal] = useState(
    selectedOption.length ? selectedOption : [options[0]]
  )
  const [updateCounter, setUpdateCounter] = useState(0)

  // update project member into list
  useEffect(() => {
    const options = fetchedOptions.map(mem => ({ id: mem.id, title: mem.name }))
    all && options.push({ id: 'ALL', title: 'All project' })

    setOptions(options as ListItemValue[])
  }, [fetchedOptions])

  useEffect(() => {
    const selectedOptions = options.filter(
      m => value && value.some(v => v === m.id)
    )
    selectedOptions.length ? setVal(selectedOptions) : setVal([defaultOption])
  }, [options])

  // call onChange everytime user select an other assignee
  useEffect(() => {
    updateCounter > 0 &&
      onChange &&
      onChange(val.map(v => v.id).filter(m => m !== defaultOption.id))
  }, [updateCounter])

  const getSelectedMember = (selected: ListItemValue[]) => {
    const selectedOptions = fetchedOptions.filter(m =>
      selected.some(s => s.id === m.id)
    )

    if (selected.find(s => s.id === 'ALL')) {
      return (
        <div className="flex gap-2 items-center shrink-0 selected-member bg-gray-50 rounded-md border px-0.5">
          All project
        </div>
      )
    }

    if (!selectedOptions.length) {
      return (
        <div className="flex gap-2 items-center shrink-0 selected-member bg-gray-50 rounded-md border px-0.5">
          None
        </div>
      )
    }

    const reverseMembers = selectedOptions.reverse().slice(0, 3)
    const TheFirstThreeItem = reverseMembers.map(sm => {
      return (
        <div
          key={sm.id}
          className="flex gap-2 items-center shrink-0 selected-project bg-gray-50 border px-0.5 rounded-md">
          {compact ? null : (
            <span className="name">{sm && sm.name ? sm.name : 'None'}</span>
          )}
        </div>
      )
    })

    const n = selectedOptions.length - reverseMembers.length
    const Rest = (
      <div
        title={`and ${n} more`}
        className="flex px-1 gap-2 items-center justify-center shrink-0 selected-member bg-gray-100 border rounded-md">
        +{n}
      </div>
    )

    return (
      <>
        {TheFirstThreeItem}{' '}
        {reverseMembers.length < selectedOptions.length ? Rest : null}
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
            // const opt = fetchedOptions.find(m => m.id === option.id)
            return (
              <List.Item
                keepMeOnly={option.id === 'ALL'}
                key={option.id}
                value={option}>
                <div className="flex gap-2.5 items-center">{option.title}</div>
              </List.Item>
            )
          })}
        </List.Options>
      </List>
    </div>
  )
}
