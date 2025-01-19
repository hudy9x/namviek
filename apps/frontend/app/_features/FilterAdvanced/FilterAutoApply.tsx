import { useParams } from "next/navigation"
import { useFilterAdvancedStore } from "./store"
import { useEffect } from "react"
import { getProjectFilter } from "@namviek/core/client"
import { useFilterAdvanced } from "./useFilterAdvancedStore"

const initialFilter = {
  condition: 'AND',
  list: []
}

export default function FilterAutoApply() {
  const { projectId } = useParams()
  const initializeFilter = useFilterAdvancedStore(state => state.initializeFilter)
  const { initializeFilter: initLocal } = useFilterAdvanced()

  useEffect(() => {
    if (projectId) {
      const savedFilter = getProjectFilter(projectId)
      console.log('savedFilter', savedFilter)
      // Always initialize filter, either with saved data or empty filter
      initializeFilter(savedFilter || initialFilter)
      initLocal(savedFilter || initialFilter)
    }
  }, [projectId])
  return <></>
}
