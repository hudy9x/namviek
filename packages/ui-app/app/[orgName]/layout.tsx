'use client'
import HamburgerMenu from '@/components/HamburgerMenu'
import ProjectSidebar from './ProjectSidebar'
import { useOrgMemberGet } from '@/services/organizationMember'
import EventUserProjectUpdate from '@/features/Events/EventUserProjectUpdate'
import { useOrgIdBySlug } from '@/hooks/useOrgIdBySlug'
import { Loading } from '@shared/ui'

// NOTE: do not move these following function inside ProjectLayout
// cuz it causes a re-render to the entire component
// why ? because it contains useParams inside, and this will triggered as url updated
function PrefetchData() {
  useOrgMemberGet()
  return <></>
}

export default function ProjectLayout({
  children
}: {
  children: React.ReactNode
}) {
  const { orgId } = useOrgIdBySlug()
  if (!orgId) {
    return <Loading className='h-screen w-screen items-center justify-center' title='Oragization ...' />
  }

  return (
    <>
      <div>
        <PrefetchData />
        <EventUserProjectUpdate />
      </div>
      <ProjectSidebar />
      <main
        className="main-content w-full"
        style={{ width: 'calc(100% - 251px)' }}>
        <HamburgerMenu />
        {children}
      </main>
    </>
  )
}
