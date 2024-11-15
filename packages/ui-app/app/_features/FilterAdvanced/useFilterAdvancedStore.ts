import { createContext, useContext } from 'react'
import { FieldType } from '@prisma/client'
import { EFilterCondition, IFilterAdvancedData, TFilterAdvancedItem } from './type'

interface FilterAdvancedState {
  filter: IFilterAdvancedData
  initializeFilter: (filter: IFilterAdvancedData) => void
  addFilter: (level: number, data: TFilterAdvancedItem) => void
  switchCondition: (condition: EFilterCondition) => void
  changeFieldType: (level: number, index: number, val: { id: string, type: FieldType }) => void
  changeFilterOperator: (level: number, index: number, val: string) => void
  changeValue: (level: number, index: number, val: string) => void
  deleteFilter: (index: number) => void
  changeSubValue: (level: number, index: number, val: string) => void
}

export const FilterAdvancedContext = createContext<FilterAdvancedState | undefined>(undefined)

export function useFilterAdvanced() {
  const context = useContext(FilterAdvancedContext)
  if (context === undefined) {
    throw new Error('useFilterAdvanced must be used within a FilterAdvancedProvider')
  }
  return context
} 