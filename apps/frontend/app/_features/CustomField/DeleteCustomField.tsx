import { HiOutlineTrash } from "react-icons/hi2";
import { fieldSv } from "@/services/field";
import { messageSuccess } from "@ui-components";
import { useProjectCustomFieldStore } from "@/store/customFields";
import localforage from "localforage";
import { useParams } from "next/navigation";

export default function DeleteCustomField({ id }: { id: string }) {
  const { projectId } = useParams()
  const removeField = useProjectCustomFieldStore(state => state.removeCustomField)

  const onDelete = () => {
    fieldSv.delete(id).then(res => {
      messageSuccess('Deleted')
    })
    removeField(id)
    const key = `PROJECT_CUSTOM_FIELD_${projectId}`
    localforage.removeItem(key)
  }
  return <HiOutlineTrash className="shrink-0 cursor-pointer" onClick={onDelete} />

}
