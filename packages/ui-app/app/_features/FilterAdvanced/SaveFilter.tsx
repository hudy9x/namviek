import { useParams } from "next/navigation"
import { useFilterAdvancedStore } from "./store"
import { setProjectFilter } from "@shared/libs"
import { Button, messageSuccess } from "@shared/ui"
import { HiOutlineSave } from "react-icons/hi"

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
      leadingIcon={<HiOutlineSave className="w-4 h-4" />}
      onClick={handleSave}
      title="Save Filter"
    />
  )
}
