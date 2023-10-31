import { useTaskStore } from '@/store/task'
import { Form } from '@shared/ui'
import { useEffect, useState } from 'react'
export default function TaskCheckbox({
  id,
  selected
}: {
  id: string
  selected: boolean
}) {
  const [checked, setChecked] = useState(selected)
  const { toggleSelected } = useTaskStore()

  useEffect(() => {
    setChecked(selected)
  }, [selected])

  const onChecked = (check: boolean) => {
    toggleSelected(id)
  }

  return (
    <Form.Checkbox
      checked={checked}
      onChange={val => {
        onChecked(val)
        // setChecked(val)
        console.log(val)
      }}
    />
  )
}
