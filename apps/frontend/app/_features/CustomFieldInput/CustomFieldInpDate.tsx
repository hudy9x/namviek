import { DatePickerBorderless } from "@ui-components"
import { useCustomFieldInputContext } from "./context"

export default function CustomFieldInpDate({ value, config }: { value: string, config: string }) {

  const defaultConfig = JSON.parse(config) as { format: string, includeTime: boolean }
  const { onChange } = useCustomFieldInputContext()
  const date = value ? new Date(value) : undefined

  return <DatePickerBorderless
    className="cf-edit cf-inp-date"
    // placeholder={defaultConfig.format}
    enableTimer={defaultConfig.includeTime}
    dateFormat={defaultConfig.format}
    value={date}
    onChange={date => {
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
