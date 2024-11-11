import { FieldType } from "@prisma/client";
import FieldValueDate from "./FilterValueDate";
import { Form } from "@shared/ui";
import FilterValueSelect from "./FilterValueSelect";
import FilterValueCheckbox from "./FilterValueCheckbox";
import FilterValueMultiSelect from "./FilterValueMultiSelect";
import FilterValueInput from "./FilterValueInput";
import FilterValuePerson from './FilterValuePerson';

export default function FilterValue({ type, operator, onChange, fieldId, value }: {
  value: string
  fieldId: string
  type: FieldType,
  onChange: (val: string) => void
  operator: string
}) {
  switch (type) {
    case FieldType.DATE:
      return <FieldValueDate value={value} onChange={onChange} />

    case FieldType.SELECT:
      return <FilterValueSelect
        value={value}
        onChange={onChange}
        fieldId={fieldId}
      />

    case FieldType.MULTISELECT:
      return <FilterValueMultiSelect
        onChange={onChange}
        type={type}
        operator={operator}
        fieldId={fieldId}
      />

    case FieldType.CHECKBOX:
      return <FilterValueCheckbox onChange={onChange} />

    case FieldType.PERSON:
      return <FilterValuePerson
        fieldId={fieldId}
        value={value}
        onChange={onChange}
        operator={operator}
      />

    default:
      return <FilterValueInput
        value={value}
        onChange={onChange}
      />
  }
}
