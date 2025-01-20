import { useParams } from "next/navigation"
import { useFilterAdvancedStore } from "./store"
import { setProjectFilter } from "@namviek/core/client"
import { Button, messageSuccess } from "@ui-components"
import { PiFloppyDisk } from "react-icons/pi"
import { HiOutlineBriefcase } from "react-icons/hi2"

export default function SaveFilter() {
  const { projectId } = useParams()
  const filter = useFilterAdvancedStore(state => state.filter)

  const handleSave = () => {
    if (!projectId) return
    setProjectFilter(projectId, filter)
    messageSuccess('Filter saved successfully')
  }

  return (
    <Button
      ghost
      size="sm"
      leadingIcon={<HiOutlineBriefcase className="w-4 h-4" />}
      onClick={handleSave}
      title="Save Filter"
    />
  )
}
