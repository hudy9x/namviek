import { Favorites } from '@prisma/client'
import FavoriteProjectItem from './FavoriteProjectItem'
import FavoritePageItem from './FavoritePageItem'

export default function FavoriteItem({ data, active }: { data: Favorites, active: boolean }) {
  const { type } = data

  if (type === 'PROJECT') return <FavoriteProjectItem data={data} active={active} />

  if (type === 'PAGE') return <FavoritePageItem data={data} active={active} />

  return null
}
