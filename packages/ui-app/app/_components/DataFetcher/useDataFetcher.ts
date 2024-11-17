import { useContext, useMemo, useRef } from 'react'
import { DataFetcherContext, DataFetcherContextType } from './context'

export function useDataFetcher(): DataFetcherContextType
export function useDataFetcher<Selected>(
  selector: (state: DataFetcherContextType) => Selected,
  equalityFn?: (a: Selected, b: Selected) => boolean
): Selected
export function useDataFetcher<Selected>(
  selector?: (state: DataFetcherContextType) => Selected,
  //   equalityFn?: (a: Selected, b: Selected) => boolean
) {
  const context = useContext(DataFetcherContext)

  console.log(context)
  //   const previousRef = useRef<Selected | undefined>()
  const selectedValue = useMemo(
    () => selector && context ? selector(context) : context,
    [context, selector]
  )

  // if (!context) {
  //   throw new Error('useDataFetcher must be used within a DataFetcherProvider')
  // }

  if (!selector) {
    return context
  }

  //   if (
  //     equalityFn && 
  //     previousRef.current !== undefined &&  selectedValue &&
  //     equalityFn(previousRef.current, selectedValue)
  //   ) {
  //     return previousRef.current
  //   }

  //   previousRef.current = selectedValue
  return selectedValue
} 
