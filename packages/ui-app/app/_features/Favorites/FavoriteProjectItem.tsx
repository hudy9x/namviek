import { Favorites } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { HiChevronRight } from 'react-icons/hi2'
import FavoriteRemove from './FavoriteRemove'
import { useUrl } from '@/hooks/useUrl'
import { useProjectStore } from '@/store/project'
import { useEffect } from 'react'

export default function FavoriteProjectItem({ data }: { data: Favorites }) {
  const { push } = useRouter()
  const { projectId } = useParams()
  const { selectProject } = useProjectStore()
  const { url } = useUrl()
  const { link, id, icon, name } = data
  const activeClass = url.includes(link) ? 'active' : ''

  useEffect(() => {
    selectProject(projectId)
  }, [projectId])

  return (
    <div
      onClick={() => {
        link && push(link)
      }}
      className={`nav-item group ${activeClass}`}>
      <div className="left">
        <HiChevronRight className="text-gray-400" />
        <img src={icon} className="w-5 h-5" />
        <span className="whitespace-nowrap">{name}</span>
      </div>
      <FavoriteRemove className="opacity-0 group-hover:opacity-100" id={id} />
    </div>
  )
}
