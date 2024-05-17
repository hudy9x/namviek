'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import UserSection from '../../layouts/UserSection'
import RootSidebar from '../../layouts/RootSidebar'
import ProjectList from '@/features/Project/Nav/index'
import {
  HiOutlineBriefcase,
  HiOutlineChartPie,
  HiOutlineChevronLeft,
  HiOutlineServerStack,
  HiOutlineVideoCamera,
} from 'react-icons/hi2'
import { Button, Scrollbar } from '@shared/ui'
import { AiOutlinePlus } from 'react-icons/ai'
import ProjectAddModal from '@/features/Project/Add/ProjectAddModal'
import { useMemo, useState } from 'react'
import { useMenuStore } from '@/store/menu'
import OrgSection from 'packages/ui-app/layouts/OrgSection'
import { getLocalCache } from '@shared/libs'

function ViewAllBtn() {
  return (
    <div
      onClick={ev => {
        // ev.preventDefault()
        ev.stopPropagation()
      }}>
      <ProjectAddModal
        triggerComponent={
          <Button
            leadingIcon={<AiOutlinePlus />}
            className="uppercase text-xs"
            size="sm"
          />
        }
      />
    </div>
  )
}


function ProjectSidebarContainer({ orgID }: { orgID: string }) {
  const { setVisible: setMenuVisible } = useMenuStore()
  const pathname = usePathname()
  const { push } = useRouter()

  if (pathname.includes('/sign-in') || pathname.includes('/sign-up')) {
    return null
  }

  const menus = [
    // {
    //   title: 'Back',
    //   href: `/organization`,
    //   icon: HiArrowLeft,
    //   active: false
    // },
    {
      title: 'My works',
      href: `/${orgID}/my-works`,
      icon: HiOutlineBriefcase,
      active: pathname.includes('/my-works')
    },
    {
      title: 'Projects',
      href: `/${orgID}/project`,
      badge: ViewAllBtn,
      icon: HiOutlineServerStack,
      active: pathname.includes('/project/') || pathname.includes('/project'),
      children: ProjectList
    },
    {
      title: 'Meeting',
      href: `/${orgID}/meeting`,
      icon: HiOutlineVideoCamera,
      active: pathname.includes('/meeting')
    },
    // {
    //   title: 'Favorites',
    //   // href: `/${orgID}/favorites`,
    //   icon: HiOutlineStar,
    //   active: pathname.includes('/favorites'),
    //   children: Favorites
    // },
    {
      title: 'Reports',
      href: `/${orgID}/report`,
      icon: HiOutlineChartPie,
      active: pathname.includes(`${orgID}/report`)
    },
    // {
    //   title: 'Settings',
    //   href: `/${orgID}/setting/people`,
    //   icon: HiOutlineCog6Tooth,
    //   active: pathname.includes(`${orgID}/setting`)
    // }
  ]

  return (
    <>
      <aside className={`root-sidebar relative`}>
        {/* <RootSidebar /> */}
        <nav className={`secondary-sidebar`}>
          {/* <div className='absolute -right-[12px] bottom-[71px] z-10'> */}
          {/*   <div className='w-6 h-6 flex items-center justify-center rounded-full bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 dark:text-gray-400'> */}
          {/*     <HiOutlineChevronLeft /> */}
          {/*   </div> */}
          {/* </div> */}
          <OrgSection />
          <Scrollbar style={{ height: `calc(100vh - 141px)` }}>
            <section className="side-nav">
              {menus.map((menu, mindex) => {
                const Icon = menu.icon
                const Child = menu.children
                const MenuBadge = menu.badge
                const active = menu.active
                return (
                  <div key={mindex} className="cursor-pointer">
                    {/* <Link href={menu.href}> */}
                    <div
                      onClick={() => {
                        menu.href && push(menu.href)
                        setMenuVisible(false)
                      }}
                      className={`side-title ${active ? 'active' : ''}`}>
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5" />
                        <span>{menu.title}</span>
                      </div>
                      {MenuBadge ? <MenuBadge /> : null}
                    </div>
                    {/* </Link> */}
                    {Child && <Child />}
                  </div>
                )
              })}
            </section>
          </Scrollbar>

          <UserSection />
        </nav>
      </aside>
    </>
  )
}


export default function ProjectSidebar() {
  const { orgID } = useParams()

  const view = useMemo(() => {
    return <ProjectSidebarContainer orgID={orgID} />
  }, [orgID])

  return <>{view}</>
}
