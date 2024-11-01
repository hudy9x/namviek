import { FieldType } from "@prisma/client"
import CustomFieldInpText from "./CustomFieldInpText"
import CustomFieldInpDate from "./CustomFieldInpDate"
import CustomFieldInpSelect from "./CustomFieldInpSelect"
import CustomFieldInpCheckbox from "./CustomFieldInpCheckbox"
import CustomFieldInpMultiSelect from "./CustomFieldInpMultiSelect"
import './style.css'
import CustomFieldInpNumber from "./CustomFieldInpNumber"

type ICustomFieldInputFactoryProps = {
  data: string
  config: string
  type: FieldType
  value: string // convert all data to string
}

export default function CustomFieldInputFactory({
  data, config,
  type,
  value }: ICustomFieldInputFactoryProps) {

  const generateFieldInput = () => {
    switch (type) {
      case FieldType.TEXT:
      case FieldType.URL:
      case FieldType.EMAIL:
        return <CustomFieldInpText value={value} />

      case FieldType.NUMBER:
        return <CustomFieldInpNumber value={value} config={config} />

      case FieldType.DATE:
        return <CustomFieldInpDate value={value} config={config} />

      case FieldType.CHECKBOX:
        return <CustomFieldInpCheckbox value={value} />

      case FieldType.SELECT:
        return <CustomFieldInpSelect data={data} value={value} />

      case FieldType.MULTISELECT:
        return <CustomFieldInpMultiSelect data={data} value={value} />

      default:
        return null
    }
  }

  return <>{generateFieldInput()}</>
}
