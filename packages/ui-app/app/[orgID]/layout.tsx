'use client'
import HamburgerMenu from '@/components/HamburgerMenu'
import ProjectSidebar from './ProjectSidebar'
import { useOrgMemberGet } from '@/services/organizationMember'
import EventUserProjectUpdate from '@/features/Events/EventUserProjectUpdate'

export default function ProjectLayout({
  children
}: {
  children: React.ReactNode
}) {
  useOrgMemberGet()
  console.log('re-render project layour')

  return (
    <>
      <div>
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
