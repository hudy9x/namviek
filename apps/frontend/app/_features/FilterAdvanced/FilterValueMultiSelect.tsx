import { useProjectCustomFieldStore } from "@/store/customFields"
import { FieldType } from "@prisma/client"
import { TCustomFieldOption } from "../CustomField/store"
import { Form, ListItemValue } from "@ui-components"
import { SetStateAction, useState } from "react"

const List = Form.List

function SelectedItems({ items }: { items: ListItemValue[] }) {
  return (
    <div className="flex items-center gap-1">
      {items.slice(-2).map((item, index) => (
        <OptionTitle key={index} option={item} />
      ))}
      {items.length > 2 && (
        <span className="text-xs text-gray-500 ml-1">
          +{items.length - 2}
        </span>
      )}
    </div>
  )
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
  </div>
}

export default function FilterValueMultiSelect({
  fieldId,
  type,
  onChange,
  operator
}: {
  fieldId: string
  onChange: (val: string) => void
  type: FieldType,
  operator: string
}) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  if (!customFields || !customFields.length) return null

  const field = customFields.find(cf => cf.id === fieldId)
  if (!field) return null

  const { options } = field.data as { options: TCustomFieldOption[] }
  const refactorOptions: ListItemValue[] = options.map(opt => ({
    id: opt.value,
    icon: opt.color,
    title: opt.value
  }))

  const [selected, setSelected] = useState<ListItemValue[]>([refactorOptions[0]])

  const handleMultiChange = (value: SetStateAction<ListItemValue[]>) => {
    const newValues = typeof value === 'function'
      ? value(selected)
      : value

    setSelected(newValues)
    onChange(newValues.map(v => v.id).join(','))
  }

  return <List
    multiple={true}
    value={selected}
    onMultiChange={handleMultiChange}>
    <List.Button>
      <SelectedItems items={selected} />
    </List.Button>
    <List.Options>
      {refactorOptions.map((option, index) => {
        return <List.Item key={index} value={option}>
          <OptionTitle option={option} />
        </List.Item>
      })}
    </List.Options>
  </List>
}
