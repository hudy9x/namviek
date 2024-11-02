import { useCustomFieldInputContext } from "./context"

export default function CustomFieldInpText({ value }: { value: string }) {

  const { onChange } = useCustomFieldInputContext()
  return <div className="custom-field-inp relative">
    <div>{value}</div>

    <input className=" absolute top-0 left-0 w-full border px-1.5 py-1 rounded-md"
      onBlur={ev => {
        const val = ev.target.value
        console.log(val, value)
        if (val === value) return

        onChange(val)
      }}
      defaultValue={value || ''} />
  </div>
}
