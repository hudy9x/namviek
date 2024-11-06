import { Form } from "@shared/ui"
import { useEffect, useState } from "react"

interface FilterValueCheckboxProps {
  onChange: (value: string) => void
}

export default function FilterValueCheckbox({ onChange }: FilterValueCheckboxProps) {
  const [checked, setChecked] = useState(false)

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
