import { Button } from '@shared/ui'
import { HiOutlineStar } from 'react-icons/hi2'

interface IFavoriteProps {
  name: string
  icon: string
  link: string
}
export default function FavoriteAdd({ name, icon, link }: IFavoriteProps) {
  return (
    <div
      onClick={ev => {
        ev.stopPropagation()
      }}
      className="fav-add">
      <Button size="sm" leadingIcon={<HiOutlineStar />} />
    </div>
  )
}
