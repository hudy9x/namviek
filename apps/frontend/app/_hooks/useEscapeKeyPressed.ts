import { useEffect } from "react"

export const useEscapeKeyPressed = (func: () => void, unmontFunc?: () => void) => {

  useEffect(() => {
    const handler = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        func()
      }
    }

    document.addEventListener('keyup', handler)

    return () => {
      document.removeEventListener('keyup', handler)
      unmontFunc && unmontFunc()

    }

    // eslint-disable-next-line
  }, [])
}
