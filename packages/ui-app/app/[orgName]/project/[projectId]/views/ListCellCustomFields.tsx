import { useProjectCustomFieldStore } from "@/store/customFields";
import ListCell from "./ListCell";
import DeleteCustomField from "@/features/CustomField/DeleteCustomField";

export default function ListCellCustomFields() {
  const customFields = useProjectCustomFieldStore(state => state.customFields)

  return <>
    {customFields.map(field => {
      return <ListCell key={field.id} width={120}>
        <div className="flex items-center gap-2">
          {field.name}
          <DeleteCustomField id={field.id} />
        </div>
      </ListCell>
    })}
  </>
}
