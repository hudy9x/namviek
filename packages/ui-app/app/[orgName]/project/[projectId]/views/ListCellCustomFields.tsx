import { useProjectCustomFieldStore } from "@/store/customFields";
import ListCell from "./ListCell";
import { HiOutlineTrash } from "react-icons/hi2";
import { fieldSv } from "@/services/field";
import { messageSuccess } from "@shared/ui";

export default function ListCellCustomFields() {
  const customFields = useProjectCustomFieldStore(state => state.customFields)
  const removeField = useProjectCustomFieldStore(state => state.removeCustomField)

  const onDelete = (id: string) => {
    fieldSv.delete(id).then(res => {
      messageSuccess('Deleted')
    })
    removeField(id)

  }
  return <>
    {customFields.map(field => {
      return <ListCell key={field.id} width={70}>
        {field.name}
        <HiOutlineTrash onClick={() => onDelete(field.id)} />
      </ListCell>
    })}

  </>
}
