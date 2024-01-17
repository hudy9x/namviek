'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { setRecentVist } from '@shared/libs'
import { useServiceAutomation } from '@/hooks/useServiceAutomation'
import { useTodoFilter } from '@/features/TaskFilter/useTodoFilter'
import { useUrl } from '@/hooks/useUrl'
import { useDebounce } from '@/hooks/useDebounce'

import ProjectNav from '../../[orgID]/project/[projectId]/ProjectNav'
import useGetProjectStatus from './useGetProjectStatus'
import useGetTask from './useGetTask'
import { useGetMembers } from './useGetMembers'
import useGetProjectPoint from './useGetProjectPoint'

export default function ProjectContainer() {
  const { projectId, orgID } = useParams()
  const { getAutomationByProject } = useServiceAutomation()
  const { getSp } = useUrl()

  useTodoFilter()
  useGetProjectStatus()
  useGetTask()
  useGetMembers()
  useGetProjectPoint()

  useDebounce(() => {
    console.log('save lastest visit url')
    setRecentVist(`/${orgID}/project/${projectId}?mode=${getSp('mode')}`)
  })

  useEffect(() => {
    if (projectId) {
      getAutomationByProject(projectId)
    }
  }, [projectId])

  return <ProjectNav />
}
