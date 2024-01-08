import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useUrl = () => {
  const pathname = usePathname()
  const sp = useSearchParams()
  const [searchPath, setSearchPath] = useState('')

  const getSp = (name: string) => {
    return sp.get(name) || ''
  }

  useEffect(() => {
    setSearchPath(window.location ? window.location.search : "")
  })

  return {
    url: pathname + searchPath,
    getSp
  }
}
