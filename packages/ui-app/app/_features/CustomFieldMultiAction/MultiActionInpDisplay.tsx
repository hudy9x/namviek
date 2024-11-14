import { useProjectCustomFieldStore } from "@/store/customFields";
import { memo } from "react";
import { FieldType, Prisma } from "@prisma/client";
import CustomFieldInputFactory from "@/features/CustomFieldInput/CustomFieldInputFactory";
import CustomFieldInputProvider from "@/features/CustomFieldInput/CustomFieldInputProvider";
import { taskCustomFieldSv } from "@/services/task.customfield";
import { messageSuccess } from "@shared/ui";

function MultiActionInpDisplay() {
  const customFields = useProjectCustomFieldStore(state => state.customFields)

  const onChange = (value: string | string[], fieldId: string, type: FieldType) => {

    console.log(value, fieldId, type)
    // console.log(value)
    // taskCustomFieldSv.update({
    //   taskId,
    //   type,
    //   value,
    //   fieldId
    // }).then(res => {
    //   const { data, status } = res.data
    //   console.log('returned data:', data, status)
    //   if (status !== 200) return
    //   messageSuccess('Update field value sucecss')
    // })
  }

  console.log('render custom field', customFields)

  return <div className="grid grid-cols-2 gap-2 px-3 pb-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 138px)' }}>
    {customFields.map(field => {
      const fieldId = field.id

      if (!field) {
        return null
      }

      const type = field.type
      const data = JSON.stringify(field.data)
      const config = JSON.stringify(field.config)

      return <div key={fieldId}>
        <h2 className="text-xs mb-1">{field.name}</h2>
        <div className="list-cell border dark:border-gray-700 rounded-md">
          <CustomFieldInputProvider onChange={(value) => {
            onChange(value, fieldId, field.type)
          }} >
            <CustomFieldInputFactory
              data={data}
              config={config}
              type={type}
              value={''} />
          </CustomFieldInputProvider>
        </div>
      </div>
    })}
  </div>
}

export default memo(MultiActionInpDisplay)
// export default MultiActionInpDisplay
