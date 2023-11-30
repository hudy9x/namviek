import { useProjectStore } from '@/store/project'
import { useParams, useRouter } from 'next/navigation'
import { HiChevronRight } from 'react-icons/hi2'
import ProjectPin from '../Pin'
import { useEffect, useState } from 'react'
import { useMenuStore } from '@/store/menu'
import Badge from '@/components/Badge'
import Tooltip from 'packages/shared-ui/src/components/Tooltip'

export default function ProjectNavItem({
  pinned = false,
  id,
  name,
  badges,
  icon
}: {
  pinned?: boolean
  badges?: [number, number, number]
  id: string
  name: string
  icon: string
}) {
  const [visible, setVisible] = useState(false)
  const { setVisible: setMenuVisible } = useMenuStore()
  const params = useParams()
  const { push } = useRouter()
  const active = params.projectId === id
  const href = `${params.orgID}/project/${id}?mode=task`
  const { selectProject } = useProjectStore(state => state)
  const onSelectProject = (id: string) => {
    selectProject(id)
  }

  useEffect(() => {
    setTimeout(() => {
      setVisible(true)
    }, 100)
  }, [])

  const showBadges = () => {
    const [urgent, overdue, upcoming] = badges || []
    if (urgent)
      return (
        <Tooltip title={`${urgent} urgent`} wrapDiv={true}>
          <Badge title={urgent + ''} color="red" />
        </Tooltip>
      )
    if (overdue)
      return (
        <Tooltip title={`${overdue} overdue`} wrapDiv={true}>
          <Badge title={overdue + ''} color="purple" />
        </Tooltip>
      )
    if (upcoming)
      return (
        <Tooltip title={`${upcoming} upcoming`} wrapDiv={true}>
          <Badge title={upcoming + ''} />
        </Tooltip>
      )
    return <></>
  }

  return (
    <div
      className={`${active ? 'active' : ''} nav-item group ${
        visible ? 'opacity-100' : 'opacity-0'
      } transition-all duration-300`}
      onClick={() => {
        onSelectProject(id)
        setMenuVisible(false)
        push(href)
      }}>
      <div className="left">
        <HiChevronRight className="text-gray-400" />
        <img className="w-5 h-5" src={icon || ''} />
        <span className="whitespace-nowrap">{name}</span>
        {showBadges()}
      </div>
      <div className="right relative group-hover:opacity-100 opacity-0 transition-all">
        <ProjectPin projectId={id} pinned={pinned} />
      </div>
    </div>
  )
}
