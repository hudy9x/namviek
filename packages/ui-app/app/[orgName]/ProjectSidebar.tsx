'use client'

import { usePathname } from 'next/navigation'
import UserSection from '../../layouts/UserSection'
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi2'
import { useState } from 'react'
import OrgSection from 'packages/ui-app/layouts/OrgSection'
import ProjectNavList from '@/features/Project/Nav/List'
import { getLocalCache, setLocalCache } from '@shared/libs'

function ProjectSidebarContainer() {
  const defaultCompactMode = getLocalCache('COMPACT_MENU') || ''
  const [isCompactMode, setCompactMode] = useState(defaultCompactMode === '1')
  const classes = ['root-sidebar relative']

  isCompactMode && classes.push('compact')

  return (
    <aside className={classes.join(' ')}>
      <nav className={`secondary-sidebar`}>
        <div onClick={() => {
          setLocalCache('COMPACT_MENU', isCompactMode ? '0' : '1')
          setCompactMode(!isCompactMode)
        }} className='absolute -right-[12px] bottom-[71px] z-10'>
          <div className='w-6 cursor-pointer h-6 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 dark:text-gray-400'>
            {isCompactMode ?
              <HiOutlineChevronRight />
              :
              <HiOutlineChevronLeft />
            }
          </div>
        </div>
        <OrgSection />

        <ProjectNavList />
        <UserSection />
      </nav>
    </aside>
  )
}


export default function ProjectSidebar() {
  const pathname = usePathname()

  if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
    return null
  }
  return <ProjectSidebarContainer />
}
