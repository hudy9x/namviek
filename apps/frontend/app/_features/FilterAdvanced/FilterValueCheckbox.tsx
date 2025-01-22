import { Form } from "@ui-components"
import { useEffect, useId, useState } from "react"
import { HiOutlineCheck } from "react-icons/hi2"

interface FilterValueCheckboxProps {
  value: string
  onChange: (value: string) => void
}

export default function FilterValueCheckbox({ value, onChange }: FilterValueCheckboxProps) {
  const [checked, setChecked] = useState(value === 'true')
  const id = useId()
  const checkboxId = `checkbox-${id}`

  // useEffect(() => {
  //   onChange(checked.toString())
  // }, [checked, onChange])

  return <div className="filter-input-container form-control">
    <input id={checkboxId} className="hidden" type="checkbox" checked={checked} onChange={ev => {
      const checked = ev.target.checked
      onChange(checked ? 'true' : 'false')
      setChecked(checked)
    }} />
    <label htmlFor={checkboxId} className="filter-input form-input">
      <span className="cf-checkbox">
        <HiOutlineCheck />
      </span>
    </label>
  </div>
} 
