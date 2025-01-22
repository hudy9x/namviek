import { Form, ListItemValue } from "@ui-components"
import { useCustomFieldInputContext } from "./context"
import { TCustomFieldOption } from "../CustomField/store"
import { useEffect, useState } from "react"

const List = Form.List

export default function CustomFieldInpSelect({ value, data }: { value: string, data: string }) {
  const colorMap = new Map<string, string>()
  const { options: dataOptions } = JSON.parse(data) as { options: TCustomFieldOption[] }
  const [options, setOptions] = useState<ListItemValue[]>([
    {
      icon: '',
      id: '',
      title: '(Empty)'
    },
    ...dataOptions.map(opt => {
      colorMap.set(opt.value, opt.color)
      return {
        icon: opt.color,
        id: opt.value,
        title: opt.value
      }
    })
  ])

  const defaultSelected = value ? options.find(opt => opt.id === value) : options[0]
  const [selected, setSelected] = useState<ListItemValue>(defaultSelected || options[0])
  const [counter, setCounter] = useState(0)
  const { onChange } = useCustomFieldInputContext()

  // re-render when value prop changes
  useEffect(() => {
    const defaultSelected = value ? options.find(opt => opt.id === value) : options[0]
    if (defaultSelected) {
      setSelected(defaultSelected)
    }
  }, [value])

  // re-render options as user update field's data
  useEffect(() => {
    const { options: dataOptions } = JSON.parse(data) as { options: TCustomFieldOption[] }

    let newSelectedItem: ListItemValue | null = null
    let foundSelectedItem = false
    setOptions(dataOptions.map(opt => {
      const item: ListItemValue = {
        icon: opt.color,
        id: opt.value,
        title: opt.value
      }

      if (opt.value === selected.id) {
        foundSelectedItem = true
        newSelectedItem = item
      }
      colorMap.set(opt.value, opt.color)
      return item
    }))

    if (newSelectedItem && foundSelectedItem) {
      setSelected(newSelectedItem)
    }

    // case: user update options
    // and accident the selected item contains the old value
    // so we need to clear currect select value
    if (!foundSelectedItem) {
      setSelected({
        icon: '',
        id: '',
        title: ''
      })
    }

  }, [data])

  useEffect(() => {
    if (counter > 0) {
      onChange(selected.id)
    }
  }, [counter, selected.id])

  if (!options || !options?.length) return null

  const genIcon = (icon: string) => {
    if (!icon) return null
    if (icon.includes('http')) {
      return <img className="w-4 h-4" src={icon} />
    }

    return <span className="w-4 h-4 border rounded-md" style={{ backgroundColor: icon }}></span>
  }

  return <div className="cf-input-container">
    <List
      onChange={(val: ListItemValue) => {
        setSelected(val)
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

