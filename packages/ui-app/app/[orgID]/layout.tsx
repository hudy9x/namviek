'use client'
import HamburgerMenu from '@/components/HamburgerMenu'
import ProjectSidebar from './ProjectSidebar'
import { useOrgMemberGet } from '@/services/organizationMember'

export default function ProjectLayout({
  children
}: {
  children: React.ReactNode
}) {
  useOrgMemberGet()

  return (
    <>
      <ProjectSidebar />
      <main className="main-content w-full">
        <HamburgerMenu />
        {children}
      </main>
    </>
  )
}
