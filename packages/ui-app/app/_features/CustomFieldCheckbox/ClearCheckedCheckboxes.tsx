import { useParams } from "next/navigation"
import { useEffect } from "react"
import { useCheckboxStore } from "./useCheckboxStore"

export default function ClearCheckedCheckboxes() {
  const { projectId } = useParams()
  const clear = useCheckboxStore(state => state.clear)

  useEffect(() => {
    clear()
  }, [projectId])

  return null
}
