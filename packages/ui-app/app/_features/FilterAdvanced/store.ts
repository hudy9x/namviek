import { create } from 'zustand'
import { FieldType } from '@prisma/client'
import { produce } from 'immer'
import { EFilterCondition, IFilterAdvancedData, TFilterAdvancedItem } from './type'
import { filterOperatorMap } from './type'

interface FilterAdvancedState {
  filter: IFilterAdvancedData
  // Actions
  addFilter: (level: number, data: TFilterAdvancedItem) => void
  switchCondition: (condition: EFilterCondition) => void
  changeFieldType: (level: number, index: number, val: { id: string, type: FieldType }) => void
  changeFilterOperator: (level: number, index: number, val: string) => void
  changeValue: (level: number, index: number, val: string) => void
  deleteFilter: (index: number) => void
}

const initialFilter: IFilterAdvancedData = {
  condition: EFilterCondition.AND,
  list: []
}

export const useFilterAdvancedStore = create<FilterAdvancedState>((set) => ({
  filter: initialFilter,

  addFilter: (level: number, data: TFilterAdvancedItem) =>
    set(
      produce((state: FilterAdvancedState) => {
        state.filter.list.push(data)
      })
    ),

  switchCondition: (condition: EFilterCondition) =>
    set(
      produce((state: FilterAdvancedState) => {
        state.filter.condition = condition
      })
    ),

  changeFieldType: (level: number, index: number, val: { id: string, type: FieldType }) =>
    set(
      produce((state: FilterAdvancedState) => {
        const operator = filterOperatorMap.get(val.type)
        state.filter.list[index].id = val.id
        state.filter.list[index].type = val.type
        state.filter.list[index].value = ''
        if (operator) {
          state.filter.list[index].operator = operator[0]
        }
      })
    ),

  changeFilterOperator: (level: number, index: number, val: string) =>
    set(
      produce((state: FilterAdvancedState) => {
        state.filter.list[index].operator = val
      })
    ),

  changeValue: (level: number, index: number, val: string) =>
    set(
      produce((state: FilterAdvancedState) => {
        state.filter.list[index].value = val
      })
    ),

  deleteFilter: (index: number) =>
    set(
      produce((state: FilterAdvancedState) => {
        state.filter.list = state.filter.list.filter((_, idx) => idx !== index)
      })
    ),
}))