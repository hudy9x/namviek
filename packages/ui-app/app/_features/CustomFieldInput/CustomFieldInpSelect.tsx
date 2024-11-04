import { Form, ListItemValue } from "@shared/ui"
import { useCustomFieldInputContext } from "./context"
import { TCustomFieldOption } from "../CustomField/store"
import { useEffect, useState } from "react"

const List = Form.List

export default function CustomFieldInpSelect({ value, data }: { value: string, data: string }) {
  const colorMap = new Map<string, string>()
  const { options: dataOptions } = JSON.parse(data) as { options: TCustomFieldOption[] }
  const [options, setOptions] = useState<ListItemValue[]>(dataOptions.map(opt => {
    console.log(opt)
    colorMap.set(opt.value, opt.color)
    return {
      icon: opt.color,
      id: opt.value,
      title: opt.value
    }
  }))

  const defaultSelected = options.find(opt => opt.id === value)
  console.log('defaultSelected', defaultSelected)
  const [selected, setSelected] = useState<ListItemValue>(defaultSelected || options[0])
  const [counter, setCounter] = useState(0)
  const { onChange } = useCustomFieldInputContext()


  useEffect(() => {
    if (counter > 0) {
      onChange(selected.id)
    }
  }, [counter, selected.id])

  if (!options || !options?.length) return null

  const genIcon = (icon: string) => {
    console.log('icon', icon)
    if (icon.includes('http')) {
      return <img className="w-4 h-4" src={icon} />
    }

    return <span className="w-4 h-4 border rounded-md" style={{ backgroundColor: icon }}></span>
  }

  return <div className="cf-input-container">
    <List
      onChange={val => {
        setSelected(val as ListItemValue)
        setCounter(counter + 1)
      }}
      value={selected}>
      <List.Button>
        <div className="inline-flex items-center gap-2" >
          {genIcon(selected.icon || '')}
          {selected.title}
        </div>
      </List.Button>
      <List.Options width={150}>
        {options.map(option => {
          const bg = colorMap.get(option.id)
          return <List.Item key={option.id} value={option}>
            <div className="text-xs rounded-md p-1 inline-flex items-center gap-2" >
              {genIcon(option.icon || '')}
              {option.title}
            </div>
          </List.Item>
        })}
      </List.Options>
    </List></div>
}

