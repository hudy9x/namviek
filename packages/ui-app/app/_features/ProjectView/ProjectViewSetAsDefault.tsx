import { projectView } from "@/services/projectView";
import useServiceProject from "@/services/useServiceProject";
import { useProjectViewStore } from "@/store/projectView";
import { DropdownMenu, confirmWarning, messageError, messageSuccess } from "@shared/ui";
import { useParams } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi2";
import { PiAnchorBold } from "react-icons/pi";

export default function ProjectViewSetAsDefault({ id }: { id: string }) {
  const { deleteView } = useProjectViewStore()
  const { projectDataUpdate } = useServiceProject()
  const { projectId } = useParams()

  const setAsDefaultView = () => {
    if (!projectId) return

    projectDataUpdate({
      id: projectId,
      projectViewId: id
    })

  }
  return <DropdownMenu.Item
    onClick={setAsDefaultView}
    icon={<PiAnchorBold />}
    title='Set as default'
  />
}
