'use client'
import HamburgerMenu from '@/components/HamburgerMenu'
import ProjectSidebar from './ProjectSidebar'
import UserPermission from '@/features/UserPermission'

export default function ProjectLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ProjectSidebar />
      <main className="main-content w-full">
        <HamburgerMenu />
        {children}
      </main>
      <UserPermission />
    </>
  )
}
