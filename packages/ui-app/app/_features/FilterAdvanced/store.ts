import { create } from 'zustand'
import { produce } from 'immer'
import { EFilterCondition, IFilterAdvancedData } from './type'

interface FilterAdvancedState {
  filter: IFilterAdvancedData
  initializeFilter: (filter: IFilterAdvancedData) => void
}

const initialFilter: IFilterAdvancedData = {
  condition: EFilterCondition.AND,
  list: []
}

export const useFilterAdvancedStore = create<FilterAdvancedState>((set) => ({
  filter: initialFilter,

  initializeFilter: (filter: IFilterAdvancedData) =>
    set(produce((state: FilterAdvancedState) => {
      state.filter = filter
    })),

}))
