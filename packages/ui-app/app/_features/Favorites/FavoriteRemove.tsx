import useServiceFavoriteUpdate from '@/hooks/useServiceFavoriteUpdate'
import { Button } from '@shared/ui'
import { RiUnpinLine } from 'react-icons/ri'

export default function FavoriteRemove({
  id,
  className
}: {
  id: string
  className?: string
}) {
  const { delFromFavorite } = useServiceFavoriteUpdate()
  return (
    <div
      onClick={ev => {
        ev.stopPropagation()
        delFromFavorite(id)
      }}
      className={`fav-del ${className}`}>
      <Button size="sm" leadingIcon={<RiUnpinLine />} />
    </div>
  )
}
