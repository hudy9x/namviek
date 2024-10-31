import { DatePickerBorderless } from "@shared/ui"
import { useCustomFieldInputContext } from "./context"

export default function CustomFieldInpDate({ value, config }: { value: string, config: string }) {

  const defaultConfig = JSON.parse(config) as { format: string, includeTime: boolean }
  console.log('config', defaultConfig)
  const { onChange } = useCustomFieldInputContext()
  const date = value ? new Date(value) : undefined
  return <DatePickerBorderless dateFormat={defaultConfig.format} className="custom-field-date"
    value={date}
    onChange={date => {
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
