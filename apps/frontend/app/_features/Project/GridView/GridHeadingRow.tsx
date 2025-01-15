import CustomFieldDisplay from "@/features/CustomFieldDisplay";
import CustomFieldAction from "@/features/CustomFieldDisplay/CustomFieldAction";
import CustomFieldResize from "@/features/CustomFieldDisplay/CustomFieldResize";
import GridHeadingCheckbox from "./GridHeadingCheckbox";

export default function GridHeadingRow() {

  return <div className="list-heading list-row">
    <GridHeadingCheckbox />
    <CustomFieldDisplay sortable={true} createBtn={true}>
      {(index, fieldData) => {
        const { name, width, id } = fieldData
        return <>
          <div className="flex items-center justify-between gap-2 text-sm">
            {name}
            <CustomFieldAction data={fieldData} />
          </div>
          <CustomFieldResize id={id} index={index} width={width || 100} />
        </>
      }}
    </CustomFieldDisplay>
  </div>
}
