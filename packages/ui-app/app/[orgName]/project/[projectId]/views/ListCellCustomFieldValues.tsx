import { useProjectCustomFieldStore } from "@/store/customFields";
import ListCell from "./ListCell";
import { FieldType, Prisma } from "@prisma/client";
import CustomFieldInputFactory from "@/features/CustomFieldInput/CustomFieldInputFactory";
import CustomFieldInputProvider from "@/features/CustomFieldInput/CustomFieldInputProvider";
import { taskCustomFieldSv } from "@/services/task.customfield";
import { messageSuccess } from "@shared/ui";

export default function ListCellCustomFieldValues({ data, taskId }: { data: Prisma.JsonValue, taskId: string }) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const customData = (data || {}) as Prisma.JsonObject

  const onChange = (value: string, fieldId: string, type: FieldType) => {
    console.log(value)
    taskCustomFieldSv.update({
      taskId,
      type,
      value,
      fieldId
    }).then(res => {
      const { data, status } = res.data
      console.log('returned data:', data, status)
      if (status !== 200) return
      messageSuccess('Update field value sucecss')
    })
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
        <CustomFieldInputProvider onChange={(value) => {
          onChange(value, field.id, field.type)
        }} >
          <CustomFieldInputFactory type={type} value={dataValue ? (dataValue + '') : ''} />
        </CustomFieldInputProvider>
      </ListCell>
    })}

  </>
}
