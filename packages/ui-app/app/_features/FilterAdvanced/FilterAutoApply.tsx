import { useParams } from "next/navigation"
import { useFilterAdvancedStore } from "./store"
import { useEffect } from "react"
import { getProjectFilter } from "@shared/libs"

const initialFilter = {
  condition: 'AND',
  list: []
}

export default function FilterAutoApply() {
  const { projectId } = useParams()
  const initializeFilter = useFilterAdvancedStore(state => state.initializeFilter)

  useEffect(() => {
    if (projectId) {
      const savedFilter = getProjectFilter(projectId)
      // Always initialize filter, either with saved data or empty filter
      initializeFilter(savedFilter || initialFilter)
    }
  }, [projectId])
  return <></>
}
