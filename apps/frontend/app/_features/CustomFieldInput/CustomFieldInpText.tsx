import { useRef } from "react"
import { useCustomFieldInputContext } from "./context"

export default function CustomFieldInpText({ value }: { value: string }) {

  const ref = useRef<HTMLInputElement>(null)
  const { onChange } = useCustomFieldInputContext()
  const handleUpdate = (val: string) => {
    console.log(val, value)
    if (val === value) return

    onChange(val)
  }

  return <div className="cf-input-container">
    <input className="cf-display bg-transparent"
      ref={ref}
      key={value}
      onKeyUp={ev => {
        const target = ev.target as HTMLInputElement
        if (ev.key === 'Enter') {
          handleUpdate(target.value)
          ref.current?.blur()
        }
      }}
      onBlur={ev => {
        const val = ev.target.value
        handleUpdate(val)
      }}
      defaultValue={value || ''} />
  </div>
}
