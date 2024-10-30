import { FieldType } from "@prisma/client"
import CustomFieldInpText from "./CustomFieldInpText"
import CustomFieldInpDate from "./CustomFieldInpDate"

export default function CustomFieldInputFactory({ type, value, onChange }: {
  type: FieldType
  value: string
  onChange?: (val: string) => void
}) {

  const generateFieldInput = () => {
    switch (type) {
      case FieldType.TEXT:
      case FieldType.URL:
      case FieldType.EMAIL:
        return <CustomFieldInpText value={value} />

      case FieldType.DATE:
        return <CustomFieldInpDate value={value} />

      default:
        return null
    }
  }

  return <>{generateFieldInput()}</>
}
