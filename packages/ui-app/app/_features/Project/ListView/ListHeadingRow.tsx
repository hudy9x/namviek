import DeleteCustomField from "@/features/CustomField/DeleteCustomField";
import { useCustomFieldStore } from "@/features/CustomField/store";
import CustomFieldDisplay from "@/features/CustomFieldDisplay";
import CustomFieldResize from "@/features/CustomFieldDisplay/CustomFieldResize";

export default function ListHeadingRow() {
  // const setEditCustomField = useCustomFieldStore(state => state.setEditData)

  return <CustomFieldDisplay>
    {(index, fieldData) => {
      const { name, width, id } = fieldData
      return <>
        <div className="flex items-center gap-2">
          {name}
          <DeleteCustomField id={id} />
        </div>
        <CustomFieldResize id={id} index={index} width={width || 100} />
      </>
    }}
  </CustomFieldDisplay>
  // return <div className="list-heading list-row">
  //   {customFields.map(cf => {
  //     const configData = cf.config as Prisma.JsonObject
  //     const width = (configData.width || 100) as number
  //
  //     return <div key={cf.id}
  //       className="list-cell"
  //       onClick={() => {
  //         setEditCustomField(cf)
  //       }}
  //       style={{ width: width }}>
  //       {cf.name}
  //     </div>
  //   })}
  //   <div className="list-cell"><CreateField /></div>
  //
  // </div>
}
