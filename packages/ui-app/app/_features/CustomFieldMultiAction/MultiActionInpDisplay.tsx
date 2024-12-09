import { useProjectCustomFieldStore } from "@/store/customFields";
import { memo } from "react";
import { FieldType } from "@prisma/client";
import CustomFieldInputFactory from "@/features/CustomFieldInput/CustomFieldInputFactory";
import CustomFieldInputProvider from "@/features/CustomFieldInput/CustomFieldInputProvider";

interface MultiActionInpDisplayProps {
  onFieldChange: (value: string | string[], fieldId: string, type: FieldType) => void;
}

function MultiActionInpDisplay({ onFieldChange }: MultiActionInpDisplayProps) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)

  const onChange = (value: string | string[], fieldId: string, type: FieldType) => {
    onFieldChange(value, fieldId, type)
  }

  return <div className="grid grid-cols-2 gap-2 px-3 pb-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 138px)' }}>
    {customFields.map(field => {
      const fieldId = field.id

      if (!field) {
        return null
      }

      const type = field.type
      const data = JSON.stringify(field.data)
      const config = JSON.stringify(field.config)

      if (type === FieldType.FILES || type === FieldType.CREATED_AT || type === FieldType.CREATED_BY || type === FieldType.UPDATED_AT || type === FieldType.UPDATED_BY) {
        return null
      }

      return <div key={fieldId}>
        <h2 className="text-xs mb-1">{field.name}</h2>
        <div className="list-cell border dark:border-gray-700 rounded-md">
          <CustomFieldInputProvider onChange={(value) => {
            onChange(value, fieldId, field.type)
          }} >
            <CustomFieldInputFactory
              rowId=""
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
