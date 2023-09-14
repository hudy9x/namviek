'use client'

import { favGet } from '@/services/favorite'
import { useFavStore } from '@/store/favorite'
import { useEffect } from 'react'
import FavoriteItem from './FavoriteItem'
import { useParams } from 'next/navigation'

export default function FavoritesList() {
  const { orgID } = useParams()
  const { favorites, addAllFavorites } = useFavStore()

  useEffect(() => {
    favGet(orgID)
      .then(res => {
        const { data } = res.data
        addAllFavorites(data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  return (
    <div className="nav">
      {favorites.map(fav => {
        return <FavoriteItem key={fav.id} data={fav} />
      })}
    </div>
  )
}
