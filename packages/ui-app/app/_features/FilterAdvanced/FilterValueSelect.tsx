import { useProjectCustomFieldStore } from "@/store/customFields"
import { FieldType } from "@prisma/client"
import { TCustomFieldOption } from "../CustomField/store"
import { Form, ListItemValue } from "@shared/ui"
import { useEffect, useState } from "react"

const List = Form.List

export default function FilterValueSelect({
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

  const [selected, setSelected] = useState(refactorOptions[0])

  return <List value={selected} onChange={(val: ListItemValue) => {
    setSelected(val)
    onChange(val.id)
  }}>
    <List.Button>
      <OptionTitle option={selected} />
    </List.Button>
    <List.Options>
      {refactorOptions.map(option => {
        return <List.Item value={option}>
          <OptionTitle option={option} />
        </List.Item>
      })}
    </List.Options>
  </List>
}

function OptionTitle({ option }: { option: ListItemValue }) {
  const { icon, title, id } = option
  const isImage = icon?.includes('http')

  return <div className="flex items-center gap-2">
    {isImage
      ? <img src={icon} className="w-4 h-4 rounded-md" />
      : <div className="w-4 h-4 rounded-md" style={{ backgroundColor: icon }} ></div>
    }
    {title}
  </div >

}
