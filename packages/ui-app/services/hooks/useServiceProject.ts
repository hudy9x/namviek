import { PinnedProjectSetting, useProjectStore } from '@/store/project'
import { useEffect } from 'react'
import { projectGet, projectPinGetList } from '../project'
import { useParams } from 'next/navigation'
import localForage from 'localforage'
import { Project } from '@prisma/client'

export const useServiceProject = () => {
  const params = useParams()
  const keyList = `PROJECT_LIST_${params.orgID}`
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
    localForage
      .getItem(keyList)
      .then(val => {
        addAllProject(val as Project[])
      })
      .catch(err => {
        console.log('error get item', err)
      })

    projectGet({
      orgId: params.orgID,
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
  }, [])
}
