import { FieldType } from "@prisma/client";
import FieldValueDate from "./FilterValueDate";
import FilterValueSelect from "./FilterValueSelect";
import FilterValueCheckbox from "./FilterValueCheckbox";
import FilterValueMultiSelect from "./FilterValueMultiSelect";
import FilterValueInput from "./FilterValueInput";
import FilterValuePerson from './FilterValuePerson';
import { emptyOperators } from "./type";

export default function FilterValue({ type, operator, onChange, fieldId, value }: {
  value: string
  fieldId: string
  type: FieldType,
  onChange: (val: string) => void
  operator: string
}) {
  if (emptyOperators.includes(operator)) {
    return null
  }

  switch (type) {
    case FieldType.DATE:
    case FieldType.CREATED_AT:
    case FieldType.UPDATED_AT:
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
      return <FilterValueCheckbox value={value} onChange={onChange} />

    case FieldType.PERSON:
    case FieldType.CREATED_BY:
    case FieldType.UPDATED_BY:
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
