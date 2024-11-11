import { useParams } from "next/navigation"
import { useFilterAdvancedStore } from "./store"
import { useEffect } from "react"
import { getProjectFilter } from "@shared/libs"

export default function FilterAutoApply() {
  const { projectId } = useParams()
  const initializeFilter = useFilterAdvancedStore(state => state.initializeFilter)

  useEffect(() => {
    if (projectId) {
      const savedFilter = getProjectFilter(projectId)
      if (savedFilter) {
        initializeFilter(savedFilter)
      }
    }
  }, [projectId])
  return <></>
}
