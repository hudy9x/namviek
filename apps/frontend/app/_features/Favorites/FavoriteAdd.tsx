import useServiceFavoriteUpdate, {
  IFavoriteProps
} from '@/hooks/useServiceFavoriteUpdate'
import { Button } from '@shared/ui'
import { HiOutlineStar } from 'react-icons/hi2'

export default function FavoriteAdd({
  name,
  icon,
  link,
  type,
  className,
  size
}: IFavoriteProps & { className?: string; size?: 'sm' | 'base' | 'lg' }) {
  const { addToFavorite } = useServiceFavoriteUpdate()
  return (
    <div
      onClick={ev => {
        ev.stopPropagation()
        addToFavorite({
          name,
          icon,
          link,
          type
        })
      }}
      className={`fav-add ${className}`}>
      <Button size={size || 'sm'} leadingIcon={<HiOutlineStar />} />
    </div>
  )
}
