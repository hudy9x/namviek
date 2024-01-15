import { PinnedProjectSetting, useProjectStore } from "@/store/project"
import { useEffect } from "react"
import { projectGet, projectPinGetList } from "../project"
import { useParams } from "next/navigation"
import { getLocalJSONCache, setLocalJSONCache } from "@shared/libs"

export const useServiceProject = () => {
  const params = useParams()
  const keyList = `PROJECT_LIST_${params.orgID}`
  // const keyPin = `PROJECT_PIN_${params.orgID}`

  const {
    setLoading,
    addAllProject,
    addPinnedProjects
  } = useProjectStore()

  // get pinned project id by user setting
  useEffect(() => {
    // setLoading(true)

    projectPinGetList().then(result => {
      const { data } = result.data
      const pinnedProjects = data as PinnedProjectSetting[]

      addPinnedProjects(pinnedProjects)
    })

  }, [])

  // get project id by orgId
  useEffect(() => {
    const cachedList = getLocalJSONCache(keyList)
    if (cachedList) {
      console.log('cached list', cachedList)
      addAllProject(cachedList)
    }

    projectGet({
      orgId: params.orgID,
      isArchive: false
    }).then(result => {
      const { data, status } = result.data

      if (status !== 200) return

      setLoading(false)
      addAllProject(data)

      setLocalJSONCache(keyList, data)
    })

  }, [])
}

