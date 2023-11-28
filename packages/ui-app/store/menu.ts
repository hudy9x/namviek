import { create } from 'zustand'
import { produce } from 'immer'

interface MenuState {
  visible: boolean
  setVisible: (stt: boolean) => void
  toggleMenu: () => void
}

export const useMenuStore = create<MenuState>(set => ({
  visible: false,
  toggleMenu: () =>
    set(
      produce((state: MenuState) => {
        state.visible = !state.visible
      })
    ),
  setVisible: (stt: boolean) =>
    set(
      produce((state: MenuState) => {
        state.visible = stt
      })
    )
}))
