import { PinnedProjectSetting, useProjectStore } from '@/store/project'
import { useEffect } from 'react'
import { projectGet, projectPinGetList } from '../project'
import localForage from 'localforage'
import { Project } from '@prisma/client'
import { useGetParams } from '@/hooks/useGetParams'

export const useServiceProject = () => {
  const { orgId } = useGetParams()
  // const keyPin = `PROJECT_PIN_${params.orgID}`

  const { setLoading, addAllProject, addPinnedProjects } = useProjectStore()

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
    if (!orgId) return

    const keyList = `PROJECT_LIST_${orgId}`
    localForage
      .getItem(keyList)
      .then(val => {
        if (val) {
          addAllProject(val as Project[])
        }
      })
      .catch(err => {
        console.log('error get item', err)
      })

    projectGet({
      orgId,
      isArchive: false
    }).then(result => {
      const { data, status } = result.data

      if (status !== 200) return

      setLoading(false)
      addAllProject(data)

      localForage.setItem(keyList, data)

      // setLocalJSONCache(keyList, data)
      // setIDBItem(keyList, data)
    })
  }, [orgId])
}
