import { favDel, favPost } from '@/services/favorite'
import { useFavStore } from '@/store/favorite'
import { Favorites } from '@prisma/client'
import { messageSuccess, randomId } from '@shared/ui'
import { useOrganizationBySlug } from './useOrganizationBySlug'

export interface IFavoriteProps {
  name: string
  icon: string
  link: string
  type: 'PROJECT' | 'PAGE'
}
export default function useServiceFavoriteUpdate() {
  const { org } = useOrganizationBySlug()
  const {
    addToFavorite: addToFavStore,
    updateFavorite,
    removeFromFavorite
  } = useFavStore()

  const delFromFavorite = (id: string) => {
    if (!org) return

    removeFromFavorite(id)
    favDel(id, org.id).then(res => {
      console.log(res)
      console.log('1231')
      messageSuccess('Removed from your favorites')
    })
  }

  const addToFavorite = ({ name, icon, link, type }: IFavoriteProps) => {
    if (!org) return
    const randId = 'FAV_RAND_' + randomId()

    addToFavStore({
      id: randId,
      orgId: org.id,
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
      orgId: org.id,
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
