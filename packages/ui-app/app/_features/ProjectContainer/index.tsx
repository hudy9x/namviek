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
import { useUser } from '@goalie/nextjs'
import { useGenTaskMappingObject } from '@/hooks/useGenTaskMappingObject'

export default function ProjectContainer() {
  const { projectId, orgID } = useParams()
  const { getAutomationByProject } = useServiceAutomation()
  const { getSp } = useUrl()
  const { user } = useUser()

  useTodoFilter()
  useGetProjectStatus()
  useGetTask()
  useGetMembers()
  useGetProjectPoint()

  // this hook generates objects in Map object
  // that helps to get task item as quickly as possible
  // by using task'id
  // Ex: tasks[id] or task[order]
  useGenTaskMappingObject()

  useDebounce(() => {
    console.log('save lastest visit url')
    if (user && user.id) {
      setRecentVist(
        user.id,
        `/${orgID}/project/${projectId}?mode=${getSp('mode')}`
      )
    }
  }, [user])

  useEffect(() => {
    if (projectId) {
      getAutomationByProject(projectId)
    }
  }, [projectId])

  return <ProjectNav />
}
