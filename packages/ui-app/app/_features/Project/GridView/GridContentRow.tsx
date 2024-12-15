import { memo } from "react";
import CustomFieldCheckboxItem from "@/features/CustomFieldCheckbox/CustomFieldCheckboxItem"
import CustomFieldDisplay from "@/features/CustomFieldDisplay"
import CustomFieldInputFactory from "@/features/CustomFieldInput/CustomFieldInputFactory"
import CustomFieldInputProvider from "@/features/CustomFieldInput/CustomFieldInputProvider"
import { ExtendedTask } from "@/store/task"
import { FieldType, Prisma } from "@prisma/client"
import { useTaskUpdate } from "@/components/DataFetcher/useTaskUpdate";
import GridBtnActions from "./GridBtnActions";

const useOnChangeCustomFieldInput = (taskId: string) => {

  const { updateOneField } = useTaskUpdate()
  const onChange = (value: string | string[], fieldId: string, type: FieldType) => {
    updateOneField({
      taskId,
      type,
      value,
      fieldId
    })
  }

  return {
    onChange
  }
}

function GridContentRow({ task }: { task: ExtendedTask }) {

  const taskCustomData = task.customFields
  // console.log('taskCustomData', taskCustomData)
  const customData = (taskCustomData || {}) as Prisma.JsonObject
  // const customFields = useProjectCustomFieldStore(state => state.customFields)
  const { onChange } = useOnChangeCustomFieldInput(task.id)

  const getFixedValue = (type: FieldType, defaultData: string) => {

    switch (type) {
      case FieldType.CREATED_BY:
        return task.createdBy || ''

      case FieldType.CREATED_AT:
        return task.createdAt ? task.createdAt.toString() : ''

      case FieldType.UPDATED_AT:
        return task.updatedAt ? task.updatedAt.toString() : ''

      case FieldType.UPDATED_BY:
        return task.updatedBy || ''
      default:
        return defaultData

    }


  }

  return <div data-testid={task.id} className="list-row"
    key={task.id}>

    <CustomFieldCheckboxItem taskId={task.id} />
    <CustomFieldDisplay>
      {(index, fieldData) => {
        const { id, type } = fieldData
        const data = JSON.stringify(fieldData.data)
        const config = JSON.stringify(fieldData.config)
        const dataValue = customData[id] // convert all to string
        const dataStrValue = getFixedValue(type, dataValue ? (dataValue + '') : '')

        console.log('index', index, id)

        return <>
          <CustomFieldInputProvider onChange={(value) => {
            onChange(value, id, type)
          }} >
            <CustomFieldInputFactory
              rowId={task.id}
              data={data}
              config={config}
              type={type}
              value={dataStrValue} />

            <GridBtnActions display={index === 0} rowId={task.id} />
          </CustomFieldInputProvider>
        </>
      }}
    </CustomFieldDisplay>

  </div>
}
export default memo(GridContentRow)
