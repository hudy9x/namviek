import { useProjectCustomFieldStore } from "@/store/customFields";
import ListCell from "./ListCell";
import { Prisma } from "@prisma/client";
import CustomFieldInputFactory from "@/features/CustomFieldInput/CustomFieldInputFactory";
import CustomFieldInputProvider from "@/features/CustomFieldInput/CustomFieldInputProvider";

export default function ListCellCustomFieldValues({ data, taskId }: { data: Prisma.JsonValue, taskId: string }) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const customData = (data || {}) as Prisma.JsonObject

  const onChange = (value: string) => {
    console.log(value)
  }

  return <>
    {customFields.map(field => {
      const fieldId = field.id

      if (!field) {
        return <ListCell key={fieldId} width={70}>
        </ListCell>
      }

      const dataValue = customData[field.id] // convert all to string
      const type = field.type

      console.log('dataVAlue', dataValue)

      return <ListCell key={fieldId} width={70}>
        <CustomFieldInputProvider onChange={onChange} >
          <CustomFieldInputFactory type={type} value={dataValue ? (dataValue + '') : ''} />
        </CustomFieldInputProvider>
      </ListCell>
    })}

  </>
}
