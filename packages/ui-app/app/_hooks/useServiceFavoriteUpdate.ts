import { favDel, favPost } from '@/services/favorite'
import { useFavStore } from '@/store/favorite'
import { Favorites } from '@prisma/client'
import { messageSuccess, randomId } from '@shared/ui'
import { useGetParams } from './useGetParams'

export interface IFavoriteProps {
  name: string
  icon: string
  link: string
  type: 'PROJECT' | 'PAGE'
}
export default function useServiceFavoriteUpdate() {
  const { orgId } = useGetParams()
  const {
    addToFavorite: addToFavStore,
    updateFavorite,
    removeFromFavorite
  } = useFavStore()

  const delFromFavorite = (id: string) => {
    if (!orgId) return

    removeFromFavorite(id)
    favDel(id, orgId).then(res => {
      console.log(res)
      console.log('1231')
      messageSuccess('Removed from your favorites')
    })
  }

  const addToFavorite = ({ name, icon, link, type }: IFavoriteProps) => {
    if (!orgId) return
    const randId = 'FAV_RAND_' + randomId()

    addToFavStore({
      id: randId,
      orgId,
      uid: '',
      name,
      icon,
      link,
      type,
      createdAt: null,
      updatedAt: null,
      createdBy: null,
      updatedBy: null
    })

    favPost({
      orgId,
      name,
      icon,
      link,
      type
    }).then(res => {
      const { data } = res.data
      messageSuccess('Added to your favorites')
      updateFavorite(randId, data as Favorites)
    })

    console.log(name, icon, link, type)
  }
  return {
    addToFavorite,
    delFromFavorite
  }
}
