import { Favorites } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { HiChevronRight } from 'react-icons/hi2'
import FavoriteRemove from './FavoriteRemove'
import { useUrl } from '@/hooks/useUrl'

export default function FavoriteProjectItem({ data }: { data: Favorites }) {
  const { push } = useRouter()
  const { url } = useUrl()
  const { link, id, icon, name } = data
  const activeClass = url.includes(link) ? 'active' : ''

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
        {/* {id} */}
      </div>
      <FavoriteRemove className="opacity-0 group-hover:opacity-100" id={id} />
    </div>
  )
}
