import { Form } from "@shared/ui"
import { useCustomFieldInputContext } from "./context"
import { useState } from "react"

export default function CustomFieldInpCheckbox({ value }: { value: string }) {

  const [checked, setChecked] = useState(value === 'true')

  const { onChange } = useCustomFieldInputContext()
  return <Form.Checkbox checked={checked} onChange={checked => {
    onChange(checked ? 'true' : 'false')
    setChecked(checked)
  }} />
  // return <input className="w-full"
  //   onBlur={ev => {
  //     const target = ev.target
  //     console.log(target.value)
  //     onChange(target.value)
  //   }}
  //   defaultValue={value || ''} />
}
