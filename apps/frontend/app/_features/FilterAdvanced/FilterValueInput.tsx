import { Form } from "@ui-components";
import { useState } from "react";
export default function FilterValueInput({ value, onChange }: {
  value: string
  onChange: (val: string) => void
}) {
  const [val, setVal] = useState(value)

  return <Form.Input
    value={val}
    onChange={ev => setVal(ev.target.value)}
    onBlur={ev => onChange(ev.target.value)}
  />
}
