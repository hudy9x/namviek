import { useCustomFieldInputContext } from "./context"

export default function CustomFieldInpNumber({ value, config }: { value: string, config: string }) {
  console.log(config)
  const { onChange } = useCustomFieldInputContext()
  return <input className="w-full border px-1.5 py-1 rounded-md"
    onBlur={ev => {
      const val = ev.target.value
      if (val === value) return

      onChange(val)
    }}
    defaultValue={value || ''} />
}
