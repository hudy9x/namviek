import { useEffect, RefObject } from 'react'

const useOutsideClick = (
  ref: RefObject<HTMLDivElement | HTMLInputElement>,
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    const target = e.target
    if (!target) {
      return
    }

    if (ref.current && !ref.current.contains(target as Node)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

export default useOutsideClick
