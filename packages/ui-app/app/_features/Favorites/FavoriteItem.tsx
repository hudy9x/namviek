import { Favorites } from '@prisma/client'
import FavoriteProjectItem from './FavoriteProjectItem'
import FavoritePageItem from './FavoritePageItem'

export default function FavoriteItem({ data }: { data: Favorites }) {
  const { type } = data

  if (type === 'PROJECT') return <FavoriteProjectItem data={data} />

  if (type === 'PAGE') return <FavoritePageItem data={data} />

  return null
}
