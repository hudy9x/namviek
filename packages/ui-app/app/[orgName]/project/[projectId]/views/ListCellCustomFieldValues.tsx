import { useProjectCustomFieldStore } from "@/store/customFields";
import ListCell from "./ListCell";
import { FieldType, Prisma } from "@prisma/client";
import CustomFieldInputFactory from "@/features/CustomFieldInput/CustomFieldInputFactory";
import CustomFieldInputProvider from "@/features/CustomFieldInput/CustomFieldInputProvider";
import { taskCustomFieldSv } from "@/services/task.customfield";
import { messageSuccess } from "@shared/ui";

const useOnChangeCustomFieldInput = (taskId: string) => {

  const onChange = (value: string | string[], fieldId: string, type: FieldType) => {
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

  return { onChange }
}

export default function ListCellCustomFieldValues({ data, taskId }: { data: Prisma.JsonValue, taskId: string }) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const { onChange } = useOnChangeCustomFieldInput(taskId)
  const customData = (data || {}) as Prisma.JsonObject


  return <>
    {customFields.map(field => {
      const fieldId = field.id

      if (!field) {
        return <ListCell key={fieldId} width={70}>
        </ListCell>
      }

      const dataValue = customData[field.id] // convert all to string
      const type = field.type
      const data = JSON.stringify(field.data)
      const config = JSON.stringify(field.config)

      console.log('dataVAlue', dataValue)

      return <ListCell key={fieldId} width={70}>
        <CustomFieldInputProvider onChange={(value) => {
          onChange(value, field.id, field.type)
        }} >
          <CustomFieldInputFactory
            data={data}
            config={config}
            type={type}
            value={dataValue ? (dataValue + '') : ''} />
        </CustomFieldInputProvider>
      </ListCell>
    })}

  </>
}
