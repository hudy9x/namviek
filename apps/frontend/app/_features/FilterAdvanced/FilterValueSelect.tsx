import { useProjectCustomFieldStore } from "@/store/customFields"
import { TCustomFieldOption } from "../CustomField/store"
import { Form, ListItemValue } from "@ui-components"
import { useMemo, useState } from "react"

const List = Form.List

export default function FilterValueSelect({
  value,
  fieldId,
  onChange,
}: {
  value: string
  fieldId: string
  onChange: (val: string) => void
}) {
  console.log('filtervalueselect', value)
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  if (!customFields || !customFields.length) return null

  const field = customFields.find(cf => cf.id === fieldId)
  if (!field) return null
  const { options } = field.data as { options: TCustomFieldOption[] }

  return <FilterValueSelectContent
    options={options}
    onChange={(val: ListItemValue) => {
      onChange(val.id)
    }}
    value={value} />
}

function OptionTitle({ option }: { option: ListItemValue }) {
  const { icon, title } = option
  const isImage = icon?.includes('http')

  return <div className="flex items-center gap-2">
    {isImage
      ? <img src={icon} className="w-4 h-4 rounded-md" />
      : <div className="w-4 h-4 rounded-md" style={{ backgroundColor: icon }} ></div>
    }
    {title}
  </div >
}

function FilterValueSelectContent({ options, onChange, value }: {
  options: TCustomFieldOption[],
  onChange: (val: ListItemValue) => void
  value: string
}) {
  const refactorOptions: ListItemValue[] = [
    {
      id: '',
      icon: '',
      title: '(Empty)'
    },
    ...options.map(opt => ({
      id: opt.value,
      icon: opt.color,
      title: opt.value
    }))
  ]

  const defaultSelected = useMemo(() => {
    if (value) {
      const found = refactorOptions.find(opt => opt.id === value)
      if (found) return found
    }

    return refactorOptions[0]
  }, [value, refactorOptions])

  const [selected, setSelected] = useState(defaultSelected)

  return <List value={selected} onChange={(val: ListItemValue) => {
    setSelected(val)
    onChange(val)
  }}>
    <List.Button>
      <OptionTitle option={selected} />
    </List.Button>
    <List.Options>
      {refactorOptions.map(option => {
        return <List.Item key={option.id} value={option}>
          <OptionTitle option={option} />
        </List.Item>
      })}
    </List.Options>
  </List>
}

