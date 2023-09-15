import {
  HiChevronRight,
  HiHashtag,
  HiOutlineDocument,
  HiOutlineDocumentText,
  HiOutlineGlobeAlt
} from 'react-icons/hi2'
import FavoriteRemove from './FavoriteRemove'
import { Favorites } from '@prisma/client'
import { useRouter } from 'next/navigation'

export default function FavoritePageItem({ data }: { data: Favorites }) {
  const { push } = useRouter()
  const { link, id, icon, name } = data
  return (
    <div
      onClick={() => {
        link && push(link)
      }}
      className="nav-item group">
      <div className="left">
        <HiChevronRight className="text-gray-400" />
        <div className="relative">
          <img src={icon} className="w-4 h-4 absolute -top-1.5 -right-1.5" />
          <HiOutlineGlobeAlt className="w-5 h-5 text-gray-400" />
        </div>
        <span className="whitespace-nowrap">{name}</span>
      </div>
      <FavoriteRemove className="opacity-0 group-hover:opacity-100" id={id} />
    </div>
  )
}
