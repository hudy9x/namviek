import { DatePicker } from "@shared/ui"
import { useCustomFieldInputContext } from "./context"

export default function CustomFieldInpDate({ value }: { value: string }) {

  const { onChange } = useCustomFieldInputContext()
  const date = value ? new Date(value) : undefined
  return <DatePicker value={date} onChange={date => {
    console.log(date.toISOString())
    onChange(date.toISOString())
  }} />
  // return <input className="w-full"
  //   onBlur={ev => {
  //     const target = ev.target
  //     console.log(target.value)
  //     onChange(target.value)
  //   }}
  //   defaultValue={value || ''} />
}
