'use client'
import HamburgerMenu from '@/components/HamburgerMenu'
import ProjectSidebar from './ProjectSidebar'
import { useOrgMemberGet } from '@/services/organizationMember'
import EventUserProjectUpdate from '@/features/Events/EventUserProjectUpdate'
import { useOrgIdBySlug } from '@/hooks/useOrgIdBySlug'
import { Loading } from '@shared/ui'
import { ReactNode } from 'react'
import { useGlobalDataFetch } from '@/features/GlobalData/useGlobalDataFetch'
import { useGlobalDataStore } from '@/store/global'

// NOTE: do not move these following function inside ProjectLayout
// cuz it causes a re-render to the entire component
// why ? because it contains useParams inside, and this will triggered as url updated
function PrefetchOrgData() {
  useOrgMemberGet()
  return <></>
}

function OrgDetailContent({ children }: { children: ReactNode }) {
  const { orgId } = useGlobalDataStore()

  console.log('run in <OrgDetailContent/>')
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

function FetchGlobalData() {
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
      <FetchGlobalData />
      <OrgDetailContent>{children}</OrgDetailContent>
    </>
  )
}
