import { FieldType } from "@prisma/client"
import CustomFieldInpText from "./CustomFieldInpText"

export default function CustomFieldInputFactory({ type, value, onChange }: {
  type: FieldType
  value: string
  onChange?: (val: string) => void
}) {

  const generateFieldInput = () => {
    switch (type) {
      case FieldType.TEXT:

        return <CustomFieldInpText value={value} />

      default:
        return null
    }
  }

  return <>{generateFieldInput()}</>
}
