import CreateField from "@/features/CustomField/CreateField";
import { useProjectCustomFieldStore } from "@/store/customFields";
import { Field } from "@prisma/client";
import { ReactNode } from "react";
import CustomFieldSortableCell from "./CustomFieldSortableCell";

interface ICustomFieldDisplayProps {
  createBtn?: boolean
  sortable?: boolean
  children: (index: number, data: Field) => ReactNode
}

function CustomFieldStaticCell({ children, width }: { children: ReactNode, width: number }) {
  return <div className="list-cell" style={{ width }}>
    {children}
  </div>
}



export default function CustomFieldDisplay({ children, createBtn = false, sortable = false }: ICustomFieldDisplayProps) {
  const customFields = useProjectCustomFieldStore(state => state.customFields)

  const generateCustomFieldCell = (index: number, cf: Field) => {
    const { width } = cf
    if (!sortable)
      return <CustomFieldStaticCell key={cf.id} width={width}>
        {children(index, cf)}
      </CustomFieldStaticCell>

    return <CustomFieldSortableCell width={width} index={index}>
      {children(index, cf)}
    </CustomFieldSortableCell>
  }

  return <>{customFields.map((cf, index) => {
    return generateCustomFieldCell(index, cf)
  })}
    <div className="list-cell">
      {createBtn ? <CreateField /> : null}
    </div>
  </>

}
