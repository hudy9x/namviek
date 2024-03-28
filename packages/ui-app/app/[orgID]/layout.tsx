'use client'
import HamburgerMenu from '@/components/HamburgerMenu'
import ProjectSidebar from './ProjectSidebar'
import { useOrgMemberGet } from '@/services/organizationMember'
import { useEventUserProjectUpdate } from '@/events/useEventUserProject'

export default function ProjectLayout({
  children
}: {
  children: React.ReactNode
}) {
  useOrgMemberGet()
  useEventUserProjectUpdate()
  console.log('re-render project layour')

  return (
    <>
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
