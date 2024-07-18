'use client'
import HamburgerMenu from '@/components/HamburgerMenu'
import ProjectSidebar from './ProjectSidebar'
import { useOrgMemberGet } from '@/services/organizationMember'
import EventUserProjectUpdate from '@/features/Events/EventUserProjectUpdate'
import { useOrgIdBySlug } from '@/hooks/useOrgIdBySlug'
import { Loading } from '@shared/ui'
import { ReactNode, useEffect } from 'react'
import { useGlobalDataFetch } from '@/features/GlobalData/useGlobalDataFetch'
import { useGlobalDataStore } from '@/store/global'
import { setLocalCache } from '@shared/libs'

// NOTE: do not move these following function inside ProjectLayout
// cuz it causes a re-render to the entire component
// why ? because it contains useParams inside, and this will triggered as url updated
function PrefetchOrgData() {
  useOrgMemberGet()
  return <></>
}

function OrgDetailContent({ children }: { children: ReactNode }) {
  const { orgId } = useGlobalDataStore()

  if (!orgId) {
    return <Loading className='h-screen w-screen items-center justify-center' title='Fetching organization data ...' />
  }

  return <>
    <PrefetchOrgData />
    <EventUserProjectUpdate />
    <ProjectSidebar />
    <main
      className="main-content w-full"
      style={{ width: 'calc(100% - 251px)' }}>
      <HamburgerMenu />
      {children}
    </main>
  </>
}

// This will clear the global data as the org page unmount
function OrgDetailClearGlobalData() {
  const { setOrgId } = useGlobalDataStore()

  useEffect(() => {
    return () => {
      console.log('Clear data inside Global data store !')
      setOrgId('')

      setLocalCache('ORG_ID', '')
      setLocalCache('ORG_SLUG', '')
    }
  }, [])
  return <></>
}

// This component used for fetching global data
function OrgDetailFetchGlobalData() {
  useGlobalDataFetch()
  return <></>
}

export default function ProjectLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <OrgDetailFetchGlobalData />
      <OrgDetailClearGlobalData />
      <OrgDetailContent>{children}</OrgDetailContent>
    </>
  )
}
