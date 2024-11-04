import { Form } from "@shared/ui"
import { useCustomFieldInputContext } from "./context"
import { useId, useState } from "react"
import { HiOutlineCheck } from "react-icons/hi2"

export default function CustomFieldInpCheckbox({ value }: { value: string }) {

  const id = useId()
  const checkboxId = `checkbox-${id}`
  const [checked, setChecked] = useState(value === 'true')
  const { onChange } = useCustomFieldInputContext()

  return <div className="cf-input-container">
    <input id={checkboxId} className="hidden" type="checkbox" checked={checked} onChange={ev => {
      const checked = ev.target.checked
      onChange(checked ? 'true' : 'false')
      setChecked(checked)
      // setChecked(checked)
    }} />
    <label htmlFor={checkboxId} className="cf-edit cursor-pointer">
      <span className="cf-checkbox">
        <HiOutlineCheck />
      </span>
    </label>
  </div>
  // return <input className="w-full"
  //   onBlur={ev => {
  //     const target = ev.target
  //     console.log(target.value)
  //     onChange(target.value)
  //   }}
  //   defaultValue={value || ''} />
}
