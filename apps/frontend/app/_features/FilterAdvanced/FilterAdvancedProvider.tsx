import { ReactNode, useState, useCallback } from 'react'
import { FieldType } from '@prisma/client'
import { EFilterCondition, IFilterAdvancedData, TFilterAdvancedItem } from './type'
import { filterOperatorMap } from './type'
import { produce } from 'immer'
import { FilterAdvancedContext } from './useFilterAdvancedStore'

const initialFilter: IFilterAdvancedData = {
  condition: EFilterCondition.AND,
  list: []
}

export function FilterAdvancedProvider({ children }: { children: ReactNode }) {
  const [filter, setFilter] = useState<IFilterAdvancedData>(initialFilter)

  const initializeFilter = useCallback((newFilter: IFilterAdvancedData) => {
    setFilter(newFilter)
  }, [])

  const addFilter = useCallback((level: number, data: TFilterAdvancedItem) => {
    setFilter(produce(draft => {
      draft.list.push({ ...data, subValue: '' })
    }))
  }, [])

  const switchCondition = useCallback((condition: EFilterCondition) => {
    setFilter(produce(draft => {
      draft.condition = condition
    }))
  }, [])

  const changeFieldType = useCallback((level: number, index: number, val: { id: string, type: FieldType }) => {
    setFilter(produce(draft => {
      const operator = filterOperatorMap.get(val.type)
      draft.list[index] = {
        ...draft.list[index],
        id: val.id,
        type: val.type,
        value: '',
        subValue: '',
        operator: operator ? operator[0] : draft.list[index].operator
      }
    }))
  }, [])

  const changeFilterOperator = useCallback((level: number, index: number, val: string) => {
    setFilter(produce(draft => {
      draft.list[index].operator = val
    }))
  }, [])

  const changeValue = useCallback((level: number, index: number, val: string) => {
    setFilter(produce(draft => {
      draft.list[index].value = val
      draft.list[index].subValue = ''
    }))
  }, [])

  const deleteFilter = useCallback((index: number) => {
    setFilter(produce(draft => {
      draft.list.splice(index, 1)
    }))
  }, [])

  const changeSubValue = useCallback((level: number, index: number, val: string) => {
    setFilter(produce(draft => {
      draft.list[index].subValue = val
    }))
  }, [])

  const value = {
    filter,
    initializeFilter,
    addFilter,
    switchCondition,
    changeFieldType,
    changeFilterOperator,
    changeValue,
    deleteFilter,
    changeSubValue
  }

  return (
    <FilterAdvancedContext.Provider value={value}>
      {children}
    </FilterAdvancedContext.Provider>
  )
} 