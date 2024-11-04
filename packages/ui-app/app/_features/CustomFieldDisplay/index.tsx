import CreateField from "@/features/CustomField/CreateField";
import { useProjectCustomFieldStore } from "@/store/customFields";
import { Field, Prisma } from "@prisma/client";
import { ReactNode } from "react";

interface ICustomFieldDisplayProps {
  createBtn?: boolean
  children: (index: number, data: Field) => ReactNode
}

export default function CustomFieldDisplay({ children, createBtn = false }: ICustomFieldDisplayProps) {

  const customFields = useProjectCustomFieldStore(state => state.customFields)
  return <>{customFields.map((cf, index) => {
    // const configData = cf.config as Prisma.JsonObject
    // const width = (configData.width || 100) as number
    const { width } = cf

    return <div key={cf.id}
      className="list-cell"
      style={{ width: width }}>
      {children(index, cf)}
    </div>
  })}
    <div className="list-cell">
      {createBtn ? <CreateField /> : null}
    </div>
  </>
}
