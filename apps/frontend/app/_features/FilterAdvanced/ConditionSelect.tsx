import { Form, ListItemValue } from "@ui-components";
import { EFilterCondition } from "./type";
import { useMemo, useState } from "react";

const List = Form.List
const options: ListItemValue[] = [
  { id: EFilterCondition.OR, title: EFilterCondition.OR },
  { id: EFilterCondition.AND, title: EFilterCondition.AND },
]

export default function ConditionSelect({ value, onChange }: { value?: string, onChange?: (val: EFilterCondition) => void }) {

  const defaultOption = useMemo(() => {
    const found = options.find(opt => opt.id === value)
    return found ? found : options[0]
  }, [value])

  const [selected, setSelected] = useState(defaultOption)

  return <List value={selected} onChange={(val: ListItemValue) => {
    setSelected(val)
    onChange && onChange(val.id as EFilterCondition)
  }}>
    <List.Button>
      {selected.title}
    </List.Button>
    <List.Options>
      {options.map(option => {
        return <List.Item key={option.id} value={option}>{option.title}</List.Item>
      })}
    </List.Options>
  </List>
}
