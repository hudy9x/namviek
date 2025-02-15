'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import ProjectList from '@/features/Project/Nav/index'
import {
  HiOutlineBriefcase,
  HiOutlineChartPie,
  HiOutlineServerStack,
  HiOutlineVideoCamera,
} from 'react-icons/hi2'
import { Button, Scrollbar } from '@ui-components'
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
    {
      title: 'Projects',
      href: `/${orgName}/project`,
      badge: ViewAllBtn,
      icon: HiOutlineServerStack,
      active: pathname.includes('/project/') || pathname.includes('/project'),
      children: ProjectList
    },  
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
