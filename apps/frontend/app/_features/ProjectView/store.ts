import { create } from 'zustand'
import { produce } from 'immer'
// import { projectViewMap } from './useProjectViewList'

interface IProjectViewModalState {
  visible: boolean
  viewId: string
  setVisible: (stt: boolean, pid?: string) => void
}

export const useProjectViewModalStore = create<IProjectViewModalState>(set => ({
  visible: false,
  viewId: '',
  setVisible: (stt: boolean, id?: string) =>
    set(
      produce((state: IProjectViewModalState) => {
        state.visible = stt
        state.viewId = id ? id : ''
      })
    ),
}))
