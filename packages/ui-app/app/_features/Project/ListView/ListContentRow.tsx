import { memo } from "react";
import CustomFieldCheckboxItem from "@/features/CustomFieldCheckbox/CustomFieldCheckboxItem"
import CustomFieldDisplay from "@/features/CustomFieldDisplay"
import CustomFieldInputFactory from "@/features/CustomFieldInput/CustomFieldInputFactory"
import CustomFieldInputProvider from "@/features/CustomFieldInput/CustomFieldInputProvider"
import { taskCustomFieldSv } from "@/services/task.customfield"
import { useProjectCustomFieldStore } from "@/store/customFields"
import { ExtendedTask } from "@/store/task"
import { FieldType, Prisma } from "@prisma/client"
import { messageSuccess } from "@shared/ui"

const useOnChangeCustomFieldInput = (taskId: string) => {

  const onChange = (value: string | string[], fieldId: string, type: FieldType) => {
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

  return {
    onChange
  }
}

function ListContentRow({ task }: { task: ExtendedTask }) {

  const taskCustomData = task.customFields
  // console.log('taskCustomData', taskCustomData)
  const customData = (taskCustomData || {}) as Prisma.JsonObject
  // const customFields = useProjectCustomFieldStore(state => state.customFields)
  const { onChange } = useOnChangeCustomFieldInput(task.id)

  return <div className="list-row"
    key={task.id}>

    <CustomFieldCheckboxItem taskId={task.id} />
    <CustomFieldDisplay>
      {(index, fieldData) => {
        const { id, type } = fieldData
        const data = JSON.stringify(fieldData.data)
        const config = JSON.stringify(fieldData.config)
        const dataValue = customData[id] // convert all to string
        console.log('dataValue', dataValue)
        return <>
          <CustomFieldInputProvider onChange={(value) => {
            console.log(id, value)
            onChange(value, id, type)
          }} >
            <CustomFieldInputFactory
              rowId={task.id}
              data={data}
              config={config}
              type={type}
              value={dataValue ? (dataValue + '') : ''} />
          </CustomFieldInputProvider>
        </>
      }}
    </CustomFieldDisplay>

  </div>
}
export default memo(ListContentRow)
