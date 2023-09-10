import { Popover } from 'packages/shared-ui/src/components/Controls'
import { Form } from '@shared/ui'
import { useCallback, useState } from 'react'

export default function TaskCheckAll({
  id,
  type,
  onChange
}: {
  id: string
  type: 'status' | 'assignee' | 'priority'
  onChange: (v: boolean) => void
}) {
  const [checked, setChecked] = useState(false)
  const handlCheckboxChange = useCallback(
    (val: boolean) => {
      onChange(val)
      setChecked(val)
    },
    [onChange]
  )

  return (
    <Popover
      triggerBy={
        <Form.Checkbox
          checked={checked}
          onChange={val => {
            handlCheckboxChange(val)
          }}
        />
      }
      content={<div>yolo</div>}
    />
  )
}
