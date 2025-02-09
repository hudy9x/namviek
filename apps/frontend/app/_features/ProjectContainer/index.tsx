'use client'

import { useParams } from 'next/navigation'
import { setRecentVist } from '@namviek/core/client'
import { useUrl } from '@/hooks/useUrl'
import { useDebounce } from '@/hooks/useDebounce'

import ProjectNav from '../../[orgName]/project/[projectId]/ProjectNav'
import { useGetMembers } from './useGetMembers'
import { useUser } from '@auth-client'
import useSetProjectViewCache from './useSetProjectViewCache'
import { useEventSyncProjectMember } from '@/events/useEventSyncProjectMember'
import { useEventSyncProjectView } from '@/events/useEventSyncProjectView'
import { useGetProjectViewList } from './useGetProjectViewList'
import { useGetCustomFields } from './useGetCustomFields'
import ClearCustomFieldCheckedCheckboxes from '../CustomFieldCheckbox/ClearCheckedCheckboxes'

function SaveRecentVisitPage() {
  const { projectId, orgName } = useParams()
  const { user } = useUser()
  const { getSp } = useUrl()

  useDebounce(() => {
    console.log('save lastest visit url')
    if (user && user.id) {
      setRecentVist(
        user.id,
        `/${orgName}/project/${projectId}?mode=${getSp('mode')}`
      )
    }
  }, [user, projectId, orgName])

  return <></>
}

function useRegisterEvents() {

  const { projectId } = useParams()

  // realtime events
  useEventSyncProjectMember(projectId)
  useEventSyncProjectView(projectId)
}

function PrefetchData() {
  // realtime events
  useRegisterEvents()

  useSetProjectViewCache()
  useGetMembers()
  useGetProjectViewList()
  useGetCustomFields()

  return <></>
}
export default function ProjectContainer() {

  return <>
    <PrefetchData />
    <SaveRecentVisitPage />
    <ProjectNav />
    <ClearCustomFieldCheckedCheckboxes />
  </>
}
