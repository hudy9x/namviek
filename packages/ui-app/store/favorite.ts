import { create } from 'zustand'
import { Favorites } from '@prisma/client'
import { produce } from 'immer'

interface FavoriteState {
  favorites: Favorites[]
  addAllFavorites: (data: Favorites[]) => void
  addToFavorite: (data: Favorites) => void
  removeFromFavorite: (id: string) => void
  updateFavorite: (id: string, data: Favorites) => void
}

export const useFavStore = create<FavoriteState>(set => ({
  favorites: [],
  addAllFavorites: (data: Favorites[]) =>
    set(
      produce((state: FavoriteState) => {
        state.favorites = data
      })
    ),
  addToFavorite: (data: Favorites) =>
    set(
      produce((state: FavoriteState) => {
        state.favorites.push(data)
      })
    ),
  updateFavorite: (id: string, data: Favorites) =>
    set(
      produce((state: FavoriteState) => {
        const favIndex = state.favorites.findIndex(fav => fav.id === id)
        if (favIndex === -1) {
          return
        }

        state.favorites[favIndex] = data
      })
    ),
  removeFromFavorite: (id: string) =>
    set(
      produce((state: FavoriteState) => {
        state.favorites = state.favorites.filter(fav => fav.id !== id)
      })
    )
}))
