import { useProjectCustomFieldStore } from "@/store/customFields";
import { FieldType } from "@prisma/client";
import { Form, ListItemValue } from "@shared/ui";
import { useMemo, useState } from "react";

const List = Form.List
export default function FieldSelect({ onChange }: { onChange?: ({ val, type }: { val: string, type: FieldType | null }) => void }) {
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

  return <List
    value={selected}
    onChange={(val: ListItemValue) => {
      setSelected(val)
      onChange && onChange({ val: val.id, type: getCustomFieldType(val.id) })
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
