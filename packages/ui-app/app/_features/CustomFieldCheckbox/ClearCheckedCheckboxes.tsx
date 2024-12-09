import { useParams, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useCheckboxStore } from "./useCheckboxStore"

export default function ClearCheckedCheckboxes() {
  const { projectId } = useParams()
  const sp = useSearchParams()
  const mode = sp.get('mode')
  const clear = useCheckboxStore(state => state.clear)

  useEffect(() => {
    clear()
  }, [projectId, mode, clear])

  return null
}
