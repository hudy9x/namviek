import { Form, ListItemValue } from "@shared/ui"
import { useCustomFieldInputContext } from "./context"
import { TCustomFieldOption } from "../CustomField/store"
import { useEffect, useMemo, useState } from "react"

const List = Form.List

interface CustomFieldInpMultiSelectProps {
  value: string
  data: string
}

export default function CustomFieldInpMultiSelect({ value, data }: CustomFieldInpMultiSelectProps) {
  const valueArr = value.split(',')
  const { options: parsedOptions } = useMemo(() => {
    try {
      return JSON.parse(data) as { options: TCustomFieldOption[] }
    } catch (e) {
      console.error('Failed to parse options data:', e)
      return { options: [] }
    }
  }, [data])

  const { options, colorMap } = useMemo(() => {
    const colors = new Map<string, string>()
    const transformedOptions = parsedOptions.map(opt => {
      colors.set(opt.value, opt.color)
      return {
        icon: opt.color,
        id: opt.value,
        title: opt.value
      }
    })
    return { options: transformedOptions, colorMap: colors }
  }, [parsedOptions])

  const defaultSelected = useMemo(() =>
    options.filter(opt => valueArr.includes(opt.id)) || [options[0]]
    , [options, valueArr])

  const [selected, setSelected] = useState<ListItemValue[]>(defaultSelected)
  const { onChange } = useCustomFieldInputContext()

  const handleSelectionChange = (value: ListItemValue[] | ((prev: ListItemValue[]) => ListItemValue[])) => {
    console.log('multi select', value)
    const newValue = typeof value === 'function' ? value(selected) : value
    setSelected(newValue)
    onChange(newValue.map(v => v.id))
  }


  if (!options?.length) return null

  console.log('selected', selected)

  return (
    <div className="z-30 relative custom-field-multiselect">
      <List
        multiple={true}
        onMultiChange={handleSelectionChange}
        value={selected}>
        <List.Button>
          {selected.map(s => {
            return <OptionDisplay
              icon={s.icon}
              title={s.title}
              backgroundColor={colorMap.get(s.id)}
            />
          })}
        </List.Button>
        <List.Options width={150}>
          {options.map(option => (
            <List.Item key={option.id} value={option}>
              <OptionDisplay
                icon={option.icon}
                title={option.title}
                backgroundColor={colorMap.get(option.id)}
              />
            </List.Item>
          ))}
        </List.Options>
      </List>
    </div>
  )
}

interface OptionDisplayProps {
  icon?: string
  title: string
  backgroundColor?: string
}

const OptionDisplay = ({ title, backgroundColor, icon }: OptionDisplayProps) => {
  const genIcon = (icon: string) => {
    console.log('icon', icon)
    if (icon.includes('http')) {
      return <img className="w-5 h-5 shrink-0" src={icon} />
    }

    return <span className="w-5 h-5 border rounded-md shrink-0" style={{ backgroundColor: icon }}></span>
  }

  return <div
    className="text-xs rounded-md p-1 inline-flex items-center gap-1"
  >
    {genIcon(icon || '')}
    {title}
  </div>

}


