import { DependencyList, EffectCallback, useEffect, useRef } from "react"

export const useDebounce = (cb: EffectCallback, dependencies?: DependencyList, time?: number) => {
  const timeout = useRef(0)

  useEffect(() => {
    let ret: ReturnType<EffectCallback>
    timeout.current = setTimeout(() => {
      ret = cb()
    }, time || 300) as unknown as number

    return () => {
      if (ret) {
        ret()
      }

      if (timeout.current) {
        // console.log('debounce run')
        clearTimeout(timeout.current)
      }
    }
  }, dependencies)
}

