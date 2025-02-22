import { memo } from "react";
import CustomFieldCheckboxItem from "@/features/CustomFieldCheckbox/CustomFieldCheckboxItem"
import CustomFieldDisplay from "@/features/CustomFieldDisplay"
import CustomFieldInputFactory from "@/features/CustomFieldInput/CustomFieldInputFactory"
import CustomFieldInputProvider from "@/features/CustomFieldInput/CustomFieldInputProvider"
import { FieldType, Grid, Prisma } from "@prisma/client"
import { useTaskUpdate } from "@/components/DataFetcher/useTaskUpdate";
import GridBtnActions from "./GridBtnActions";

const useOnChangeCustomFieldInput = (rowId: string) => {

  const { updateOneField } = useTaskUpdate()
  const onChange = (value: string | string[], fieldId: string, type: FieldType) => {
    updateOneField({
      rowId,
      type,
      value,
      fieldId
    })
  }

  return {
    onChange
  }
}

function GridContentRow({ row }: { row: Grid }) {

  const rowCustomData = row.customFields
  // console.log('taskCustomData', taskCustomData)
  const customData = (rowCustomData || {}) as Prisma.JsonObject
  // const customFields = useProjectCustomFieldStore(state => state.customFields)
  const { onChange } = useOnChangeCustomFieldInput(row.id)

  const getFixedValue = (type: FieldType, defaultData: string) => {

    switch (type) {
      case FieldType.CREATED_BY:
        return row.createdBy || ''

      case FieldType.CREATED_AT:
        return row.createdAt ? row.createdAt.toString() : ''

      case FieldType.UPDATED_AT:
        return row.updatedAt ? row.updatedAt.toString() : ''

      case FieldType.UPDATED_BY:
        return row.updatedBy || ''
      default:
        return defaultData

    }


  }

  return <div data-testid={row.id} className="list-row"
    key={row.id}>

    <CustomFieldCheckboxItem rowId={row.id} />
    <CustomFieldDisplay>
      {(index, fieldData) => {
        const { id, type } = fieldData
        const data = JSON.stringify(fieldData.data)
        const config = JSON.stringify(fieldData.config)
        const dataValue = customData[id] // convert all to string
        const dataStrValue = getFixedValue(type, dataValue ? (dataValue + '') : '')

        return <>
          <CustomFieldInputProvider onChange={(value) => {
            onChange(value, id, type)
          }} >
            <CustomFieldInputFactory
              rowId={row.id}
              data={data}
              config={config}
              type={type}
              value={dataStrValue} />

            <GridBtnActions display={index === 0} rowId={row.id} />
          </CustomFieldInputProvider>
        </>
      }}
    </CustomFieldDisplay>

  </div>
}
export default memo(GridContentRow)
