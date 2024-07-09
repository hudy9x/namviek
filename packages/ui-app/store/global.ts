
import { create } from 'zustand'
import { produce } from 'immer'


interface IGlobalState {
  orgId: string
  setOrgId: (id: string) => void
}

export const useGlobalDataStore = create<IGlobalState>(set => ({
  orgId: '',
  setOrgId: (id: string) =>
    set(
      produce((state: IGlobalState) => {
        state.orgId = id
      })
    )
}))
