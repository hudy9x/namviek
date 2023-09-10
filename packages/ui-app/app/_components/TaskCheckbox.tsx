import { Form } from '@shared/ui'
import { useEffect, useState } from 'react'
export default function TaskCheckbox({
  id,
  value = false
}: {
  id: string
  value?: boolean
}) {
  const [checked, setChecked] = useState(value)

  useEffect(() => {
    setChecked(value)
  }, [value])

  return (
    <Form.Checkbox
      checked={checked}
      onChange={val => {
        setChecked(val)
        console.log(val)
      }}
    />
  )
}
