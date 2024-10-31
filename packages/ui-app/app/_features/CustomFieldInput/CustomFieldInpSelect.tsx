import { DatePicker, Form, ListItemValue } from "@shared/ui"
import { useCustomFieldInputContext } from "./context"
import { TCustomFieldOption } from "../CustomField/store"
import { useEffect, useState } from "react"

const List = Form.List

export default function CustomFieldInpSelect({ value, data }: { value: string, data: string }) {
  const colorMap = new Map<string, string>()
  const { options: dataOptions } = JSON.parse(data) as { options: TCustomFieldOption[] }
  const [options, setOptions] = useState<ListItemValue[]>(dataOptions.map(opt => {
    colorMap.set(opt.value, opt.color)
    return {
      id: opt.value,
      title: opt.value
    }
  }))

  const defaultSelected = options.find(opt => opt.id === value)
  const [selected, setSelected] = useState<ListItemValue>(defaultSelected || options[0])
  const [counter, setCounter] = useState(0)
  const { onChange } = useCustomFieldInputContext()


  useEffect(() => {
    if (counter > 0) {
      onChange(selected.id)
    }
  }, [counter, selected.id])

  if (!options || !options?.length) return null


  return <div className="z-30 relative"><List
    onChange={val => {
      setSelected(val as ListItemValue)
      setCounter(counter + 1)
    }}
    value={options[0]}>
    <List.Button>
      <div className="text-xs rounded-md p-1 inline-block" style={{ backgroundColor: colorMap.get(selected.id) }}>
        {selected.title}
      </div>
    </List.Button>
    <List.Options width={150}>
      {options.map(option => {
        const bg = colorMap.get(option.id)
        return <List.Item key={option.id} value={option}>
          <div className="text-xs rounded-md p-1 inline-block" style={{ backgroundColor: bg }}>
            {option.title}
          </div>
        </List.Item>
      })}
    </List.Options>
  </List></div>
}

