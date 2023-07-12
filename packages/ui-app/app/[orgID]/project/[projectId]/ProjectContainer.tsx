'use client'

import { useEffect } from 'react'
import ProjectNav from './ProjectNav'
import { getProjectMember } from '../../../../services/member'
import { useParams } from 'next/navigation'
import { useMemberStore } from '../../../../store/member'
import { projectPointsGet } from '../../../../services/point'
import { useProjectPointStore } from '../../../../store/point'

export default function ProjectContainer() {
  const params = useParams()
  const { addAllMember } = useMemberStore()
  const { setAllPoints } = useProjectPointStore()

  useEffect(() => {
    getProjectMember(params.projectId).then(res => {
      const { data, status } = res.data
      if (status !== 200) {
        addAllMember([])
        return
      }

      addAllMember(data)
    })

    projectPointsGet(params.projectId).then(res => {
      const { data, status } = res.data
      if (status !== 200) {
        setAllPoints([])
        return
      }

      setAllPoints(data)
    })
  }, [])
  return <ProjectNav />
}
