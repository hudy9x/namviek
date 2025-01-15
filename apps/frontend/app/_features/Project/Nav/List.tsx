
'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import ProjectList from '@/features/Project/Nav/index'
import {
  HiOutlineBriefcase,
  HiOutlineChartPie,
  HiOutlineServerStack,
  HiOutlineVideoCamera,
} from 'react-icons/hi2'
import { Button, Scrollbar } from '@shared/ui'
import { AiOutlinePlus } from 'react-icons/ai'
import ProjectAddModal from '@/features/Project/Add/ProjectAddModal'
import { useMemo } from 'react'
import { useMenuStore } from '@/store/menu'

function ViewAllBtn() {
  return (
    <div className='create-project-btn'
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


function ProjectNavListContainer({ orgName }: { orgName: string }) {
  const { setVisible: setMenuVisible } = useMenuStore()
  const pathname = usePathname()
  const { push } = useRouter()

  const menus = [
    // {
    //   title: 'Back',
    //   href: `/organization`,
    //   icon: HiArrowLeft,
    //   active: false
    // },
    {
      title: 'My works',
      href: `/${orgName}/my-works`,
      icon: HiOutlineBriefcase,
      active: pathname.includes('/my-works')
    },
    {
      title: 'Projects',
      href: `/${orgName}/project`,
      badge: ViewAllBtn,
      icon: HiOutlineServerStack,
      active: pathname.includes('/project/') || pathname.includes('/project'),
      children: ProjectList
    },
    {
      title: 'Meeting',
      href: `/${orgName}/meeting`,
      icon: HiOutlineVideoCamera,
      active: pathname.includes('/meeting')
    },
    // {
    //   title: 'Favorites',
    //   // href: `/${orgName}/favorites`,
    //   icon: HiOutlineStar,
    //   active: pathname.includes('/favorites'),
    //   children: Favorites
    // },
    {
      title: 'Reports',
      href: `/${orgName}/report`,
      icon: HiOutlineChartPie,
      active: pathname.includes(`${orgName}/report`)
    },
    // {
    //   title: 'Settings',
    //   href: `/${orgName}/setting/people`,
    //   icon: HiOutlineCog6Tooth,
    //   active: pathname.includes(`${orgName}/setting`)
    // }
  ]


  return (<Scrollbar style={{ height: `calc(100vh - 141px)` }}>
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
  )
}


export default function ProjectNavList() {
  const { orgName } = useParams()

  const view = useMemo(() => {
    return <ProjectNavListContainer orgName={orgName} />
  }, [orgName])

  return <>{view}</>
}
