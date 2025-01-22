import { FieldType, FileType } from "@prisma/client"
import CustomFieldInpText from "./CustomFieldInpText"
import CustomFieldInpDate from "./CustomFieldInpDate"
import CustomFieldInpSelect from "./CustomFieldInpSelect"
import CustomFieldInpCheckbox from "./CustomFieldInpCheckbox"
import CustomFieldInpMultiSelect from "./CustomFieldInpMultiSelect"
import './style.css'
import CustomFieldInpNumber from "./CustomFieldInpNumber"
import CustomFieldInpUrl from "./CustomFieldInpUrl"
import CustomFieldInpEmail from "./CustomFieldInpEmail"
import CustomFieldInpPerson from "./CustomFieldInpPerson"
import { memo } from "react"
import CustomFieldInpFile from "./CustomFieldInpFile"
import CustomFieldInpCreatedAt from "./CustomFieldInpCreatedAt"
import CustomFieldInpCreatedBy from "./CustomFieldInpCreatedBy"

type ICustomFieldInputFactoryProps = {
  rowId: string
  data: string
  config: string
  type: FieldType
  value: string // convert all data to string
}

function CustomFieldInputFactory({
  rowId,
  data, config,
  type,
  value }: ICustomFieldInputFactoryProps) {

  const generateFieldInput = () => {
    switch (type) {
      case FieldType.TEXT:
        return <CustomFieldInpText value={value} />
      case FieldType.FILES:
        return <CustomFieldInpFile rowId={rowId} value={value} />

      case FieldType.CREATED_AT:
      case FieldType.UPDATED_AT:
        return <CustomFieldInpCreatedAt value={value} config={config} />

      case FieldType.CREATED_BY:
      case FieldType.UPDATED_BY:
        return <CustomFieldInpCreatedBy value={value} />

      case FieldType.EMAIL:
        return <CustomFieldInpEmail value={value} config={config} />

      case FieldType.URL:
        return <CustomFieldInpUrl value={value} config={config} />

      case FieldType.NUMBER:
        return <CustomFieldInpNumber value={value} config={config} />

      case FieldType.DATE:
        return <CustomFieldInpDate value={value} config={config} />

      case FieldType.PERSON:
        return <CustomFieldInpPerson value={value} config={config} />

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

export default memo(CustomFieldInputFactory)
