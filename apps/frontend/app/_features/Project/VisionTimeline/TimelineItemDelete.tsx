import { } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { useVisionContext } from "../Vision/context";
import { confirmAlert } from "@shared/ui";

function TimelineItemDelete({ id }: { id: string }) {
  const { deleteVision } = useVisionContext()
  const onDelete = () => {
    confirmAlert({
      message: "Are you sure you want to delete this goal ?", yes: () => {
        deleteVision(id)
      }
    })

  }

  return <HiOutlineTrash className="group-hover:opacity-100 opacity-0 btn-icon" onClick={ev => {
    ev.stopPropagation()
    onDelete()
  }} />

}


export default TimelineItemDelete
