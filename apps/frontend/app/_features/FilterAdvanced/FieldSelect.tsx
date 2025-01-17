import { useProjectCustomFieldStore } from "@/store/customFields";
import { FieldType } from "@prisma/client";
import { Form, ListItemValue } from "@ui-components";
import { useEffect, useMemo, useState } from "react";

const List = Form.List
export default function FieldSelect({
  value,
  onChange
}: {
  value?: string
  onChange?: ({ id, type }: { id: string, type: FieldType }) => void
}) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const options = useMemo(() => {
    if (!customFields) return [{ id: 'NONE', title: 'None' }]
    return customFields.map(f => ({
      id: f.id,
      title: f.name
    }))
  }, [customFields])

  const getCustomFieldType = (id: string) => {
    const found = customFields.find(f => f.id === id)
    return found ? found.type : null
  }

  const [selected, setSelected] = useState<ListItemValue>(options[0])

  useEffect(() => {
    const newSelected = options.find(opt => opt.id === value)
    newSelected && setSelected(newSelected)
  }, [value])

  return <List
    value={selected}
    onChange={(val: ListItemValue) => {
      // setSelected(val)
      const t = getCustomFieldType(val.id)
      if (t) {
        onChange && onChange({ id: val.id, type: t })
      }
    }}>
    <List.Button>
      {selected.title}
    </List.Button>
    <List.Options>
      {options.map(option => {
        return <List.Item value={option} key={option.id}>{option.title}</List.Item>
      })}
    </List.Options>
  </List>
}
