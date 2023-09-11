import { Popover } from 'packages/shared-ui/src/components/Controls'
import { Form } from '@shared/ui'
import { useCallback, useEffect, useState } from 'react'

export default function TaskCheckAll({
  id,
  type,
  onChange,
  value
}: {
  id: string
  type: 'status' | 'assignee' | 'priority'
  onChange: (v: boolean) => void
  value: boolean
}) {
  const [checked, setChecked] = useState(!!value)
  const handlCheckboxChange = useCallback(
    (val: boolean) => {
      setChecked(val)
      onChange(val)
    },
    [onChange]
  )

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <Form.Checkbox
      checked={checked}
      onChange={val => {
        handlCheckboxChange(val)
      }}
    />
  )
}
