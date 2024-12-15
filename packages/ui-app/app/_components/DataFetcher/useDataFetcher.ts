import { useContext, useMemo, useRef } from 'react'
import { DataFetcherContext, DataFetcherContextType } from './context'

export function useDataFetcher(): DataFetcherContextType
export function useDataFetcher<Selected>(
  selector: (state: DataFetcherContextType) => Selected,
  equalityFn?: (a: Selected, b: Selected) => boolean
): Selected
export function useDataFetcher<Selected>(
  selector?: (state: DataFetcherContextType) => Selected,
) {
  const context = useContext(DataFetcherContext)

  const selectedValue = useMemo(
    () => selector && context ? selector(context) : context,
    [context, selector]
  )

  if (!selector) {
    return context
  }

  return selectedValue
} 
