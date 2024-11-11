import { Form } from "@shared/ui"
import { useEffect, useState } from "react"

interface FilterValueCheckboxProps {
  value: string
  onChange: (value: string) => void
}

export default function FilterValueCheckbox({ value, onChange }: FilterValueCheckboxProps) {
  const [checked, setChecked] = useState(value === 'true')

  useEffect(() => {
    onChange(checked.toString())
  }, [checked, onChange])

  return (
    <Form.Checkbox
      checked={checked}
      onChange={(checked) => setChecked(checked)}
    />
  )
} 
