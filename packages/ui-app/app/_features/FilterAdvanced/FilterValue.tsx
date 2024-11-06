import { FieldType } from "@prisma/client";
import FieldValueDate from "./FilterValueDate";
import { Form } from "@shared/ui";
import FilterValueSelect from "./FilterValueSelect";

export default function FilterValue({ type, operator, onChange, fieldId }: {
  fieldId: string
  type: FieldType,
  onChange: (val: string) => void
  operator: string
}) {
  console.log(type)
  if (type === FieldType.DATE) {
    return <FieldValueDate onChange={onChange} />
  }

  if (type === FieldType.SELECT) {
    return <FilterValueSelect onChange={onChange} type={type} operator={operator} fieldId={fieldId} />
  }

  return <Form.Input onBlur={ev => {
    onChange(ev.target.value)
  }} />
}
