
import { create } from 'zustand'
import { produce } from 'immer'


interface IGlobalState {
  orgId: string
  orgName: string
  setOrgId: (id: string) => void
  setOrgName: (name: string) => void
}

export const useGlobalDataStore = create<IGlobalState>(set => ({
  orgId: '',
  orgName: "",
  setOrgId: (id: string) =>
    set(
      produce((state: IGlobalState) => {
        state.orgId = id
      })
    ),
  setOrgName: (name: string) =>
    set(
      produce((state: IGlobalState) => {
        state.orgName = name
      })
    )
}))
