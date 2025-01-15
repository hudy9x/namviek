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
import { useMenuStore } from '@/store/menu'

export default function FavoritePageItem({
  data,
  active
}: {
  data: Favorites
  active: boolean
}) {
  const { push } = useRouter()
  const { setVisible: setMenuVisible } = useMenuStore()
  const { link, id, icon, name } = data
  const activeClass = active ? 'active' : ''
  return (
    <div
      onClick={() => {
        if (link) {
          setMenuVisible(false)
          push(link)
        }
      }}
      className={`nav-item group ${activeClass}`}>
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
