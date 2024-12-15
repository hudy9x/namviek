import { useCustomFieldInputContext } from "./context"
import { useEffect, useId, useState } from "react"
import { HiOutlineCheck } from "react-icons/hi2"

export default function CustomFieldInpCheckbox({ value }: { value: string }) {

  const id = useId()
  const checkboxId = `checkbox-${id}`
  const [checked, setChecked] = useState(value === 'true')
  const { onChange } = useCustomFieldInputContext()

  useEffect(() => {
    setChecked(value === 'true')
  }, [value])

  return <div className="cf-input-container">
    <input id={checkboxId} className="hidden" type="checkbox" checked={checked} onChange={ev => {
      const checked = ev.target.checked
      onChange(checked ? 'true' : 'false')
      setChecked(checked)
    }} />
    <label htmlFor={checkboxId} className="cf-edit flex justify-center cursor-pointer">
      <span className="cf-checkbox">
        <HiOutlineCheck />
      </span>
    </label>
  </div>
}
