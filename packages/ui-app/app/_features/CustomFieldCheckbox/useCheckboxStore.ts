import { create } from 'zustand'
import { produce, enableMapSet } from 'immer'

enableMapSet()



interface CheckboxState {
  checkAlls: Set<string>
  ids: Record<string, Set<string>>
  toggleCheckboxAll: (checked: boolean, ids: string[], groupId: string) => void
  toogleCheckbox: (checked: boolean, id: string, groupId: string) => void
  clear: () => void
}

export const useCheckboxStore = create<CheckboxState>(set => ({
  checkAlls: new Set([]),

  ids: {},

  clear: () =>
    set(
      produce((state: CheckboxState) => {
        state.checkAlls = new Set([])
        state.ids = {}
      })
    ),


  toggleCheckboxAll: (checked: boolean, ids: string[], groupId: string) =>
    set(
      produce((state: CheckboxState) => {
        if (checked) {
          state.ids[groupId] = new Set(ids)
          state.checkAlls.add(groupId)
        } else {
          state.checkAlls.delete(groupId)
          state.ids[groupId] = new Set([])
        }
      })
    ),

  toogleCheckbox: (checked: boolean, id: string, groupId: string) =>
    set(
      produce((state: CheckboxState) => {
        const ids = state.ids

        if (!(groupId in ids)) {
          state.ids[groupId] = new Set([])
        }

        if (checked) {
          state.ids[groupId].add(id)
        } else {
          state.ids[groupId].delete(id)
        }
      })
    )
}))
