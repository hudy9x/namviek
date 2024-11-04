import { useCustomFieldInputContext } from "./context"

export default function CustomFieldInpText({ value }: { value: string }) {

  const { onChange } = useCustomFieldInputContext()
  return <div className="cf-input-container">
    <input className="cf-display"
      onBlur={ev => {
        const val = ev.target.value
        console.log(val, value)
        if (val === value) return

        onChange(val)
      }}
      defaultValue={value || ''} />
  </div>
}
