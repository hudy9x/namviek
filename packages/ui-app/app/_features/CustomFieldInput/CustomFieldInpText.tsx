import { useCustomFieldInputContext } from "./context"

export default function CustomFieldInpText({ value }: { value: string }) {

  const { onChange } = useCustomFieldInputContext()
  return <input className="w-full"
    onBlur={ev => {
      const target = ev.target
      console.log(target.value)
      onChange(target.value)
    }}
    defaultValue={value || ''} />
}
