import { FieldType } from "@prisma/client";
import { Form, ListItemValue } from "@ui-components";
import { useEffect, useMemo, useState } from "react";
import { filterOperatorMap } from "./type";

const List = Form.List

export default function FieldOperator({
  value,
  type,
  onChange
}: {
  value?: string
  type: FieldType,
  onChange?: (val: string) => void
}) {

  const options: ListItemValue[] = useMemo(() => {
    const operators = filterOperatorMap.get(type)
    if (!operators) return []
    return operators.map(operator => ({ id: operator, title: operator }))
  }, [type])

  const defaultOption = useMemo(() => {
    const found = options.find(opt => opt.id === value)
    if (!found) return options[0]

    return found
  }, [value])

  const [selected, setSelected] = useState<ListItemValue>(defaultOption)

  // update value
  useEffect(() => {
    const selectedOption = options.find(opt => opt.id === value)
    selectedOption && setSelected(selectedOption)
  }, [value])


  return <List
    value={selected}
    onChange={(val: ListItemValue) => {
      // setSelected(val)
      onChange && onChange(val.id)
    }}>
    <List.Button>
      {selected ? selected.title : null}
    </List.Button>
    <List.Options>
      {options.map(option => {
        return <List.Item value={option} key={option.id}>{option.title}</List.Item>
      })}
    </List.Options>
  </List>
}
