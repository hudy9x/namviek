import CreateField from "@/features/CustomField/CreateField";
import { useCustomFieldStore } from "@/features/CustomField/store";
import { useProjectCustomFieldStore } from "@/store/customFields";
import { Prisma } from "@prisma/client";

export default function ListHeadingRow() {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const setEditCustomField = useCustomFieldStore(state => state.setEditData)
  return <div className="list-heading list-row">
    {customFields.map(cf => {
      const configData = cf.config as Prisma.JsonObject
      const width = (configData.width || 100) as number

      return <div key={cf.id}
        className="list-cell"
        onClick={() => {
          setEditCustomField(cf)
        }}
        style={{ width: width }}>
        {cf.name}
      </div>
    })}
    <div className="list-cell"><CreateField /></div>

  </div>
}
