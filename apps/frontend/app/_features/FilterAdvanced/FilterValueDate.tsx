import { FieldType } from "@prisma/client";
import { Form, ListItemValue } from "@ui-components";
import { useEffect, useMemo, useState } from "react";
import { filterOperatorMap, filterValueMap } from "./type";

const List = Form.List

export default function FieldValueDate({
  value,
  onChange
}: {
  value?: string
  onChange?: (val: string) => void
}) {

  const options: ListItemValue[] = useMemo(() => {
    const values = filterValueMap.get(FieldType.DATE)
    if (!values) return []
    return values.map(v => ({ id: v, title: v }))
  }, [])

  const defaultOption = useMemo(() => {
    const found = options.find(opt => opt.id === value)
    if (!found) return options[0]

    return found
  }, [value])

  const [selected, setSelected] = useState<ListItemValue>(defaultOption)

  useEffect(() => {
    const newSelected = options.find(opt => opt.id === value) || options[0]
    setSelected(newSelected)
  }, [value, options])

  return <List
    value={selected}
    onChange={(val: ListItemValue) => {
      setSelected(val)
      onChange && onChange(val.id)
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
