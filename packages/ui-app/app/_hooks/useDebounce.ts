import { DependencyList, useEffect, useRef } from "react"

export const useDebounce = (cb: () => void, dependencies: DependencyList, time?: number) => {
  const timeout = useRef(0)

  useEffect(() => {
    timeout.current = setTimeout(() => {
      cb()
    }, time || 300) as unknown as number

    return () => {
      if (timeout.current) {
        console.log('debounce run')
        clearTimeout(timeout.current)
      }
    }
  }, dependencies)
}

