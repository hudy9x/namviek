import { projectView } from "@/services/projectView";
import { useProjectViewStore } from "@/store/projectView";
import { DropdownMenu, confirmWarning, messageError, messageSuccess } from "@shared/ui";
import { HiOutlineTrash } from "react-icons/hi2";

export default function ProjectViewDelete({ id }: { id: string }) {
  const { deleteView } = useProjectViewStore()
  const onDelete = () => {
    confirmWarning({
      title: "Delete project tab",
      message: "Keep in mind that your data is still be safe. Just create another view to bring your data back.",
      yes: () => {
        deleteView(id)
        projectView.delete(id).then(res => {
          console.log(res)
          messageSuccess('Delete view successfully')
        }).catch(err => {
          console.log(err)
          messageError('Delete view error')
        })
      }

    })

  }
  return <DropdownMenu.Item
    onClick={onDelete}
    icon={<HiOutlineTrash />}
    title='Delete'
  />
}
