import React from 'react'
import * as Select from '@radix-ui/react-select'

import { GiHamburgerMenu } from 'react-icons/gi'
import { BsCheck2Circle } from 'react-icons/bs'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { useListModeGroupContext } from './ListModeGroupContext'

const SelectItem = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: React.PropsWithChildren<{ className?: string; value: string }>,
    forwardedRef
  ) => {
    return (
      <Select.Item className="select-item" {...props} ref={forwardedRef}>
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="select-item-indicator">
          <BsCheck2Circle />
        </Select.ItemIndicator>
      </Select.Item>
    )
  }
)

SelectItem.displayName = 'SelectItem'

export default function ListModeHeader() {
  const { groupType, onGroupTypeChange: setGroupType } =
    useListModeGroupContext()
  console.log({ listModeHeaderLogGroup: groupType })
  return (
    <Select.Root onValueChange={setGroupType}>
      <Select.Trigger className="SelectTrigger" aria-label="Food">
        <Select.Value placeholder="Select a fruit…" />
        <Select.Icon className="SelectIcon">
          <GiHamburgerMenu />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent">
          <Select.ScrollUpButton className="SelectScrollButton">
            <MdOutlineKeyboardArrowUp />
          </Select.ScrollUpButton>
          <Select.Viewport className="SelectViewport">
            <Select.Group>
              <Select.Label className="SelectLabel">Group by</Select.Label>
              <SelectItem value="assignee">assignee</SelectItem>
              <SelectItem value="status">status</SelectItem>
              <SelectItem value="priority">priority</SelectItem>
              <SelectItem value="duedate">duedate</SelectItem>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
