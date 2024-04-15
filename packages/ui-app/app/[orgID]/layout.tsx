'use client'
import HamburgerMenu from '@/components/HamburgerMenu'
import ProjectSidebar from './ProjectSidebar'
import { useOrgMemberGet } from '@/services/organizationMember'
import EventUserProjectUpdate from '@/features/Events/EventUserProjectUpdate'
import CommandPalleteContainer from '@/features/CommandPallete'

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

  return (
    <>
      <div>
        <PrefetchData />
        <CommandPalleteContainer />
        <EventUserProjectUpdate />
      </div>
      <ProjectSidebar />
      <main
        className="main-content w-full"
        style={{ width: 'calc(100% - 308px)' }}>
        <HamburgerMenu />
        {children}
      </main>
    </>
  )
}
