import { usePathname, useSearchParams } from 'next/navigation'

export const useUrl = () => {
  const pathname = usePathname()
  const sp = useSearchParams()

  const getSp = (name: string) => {
    return sp.get(name) || ''
  }

  return {
    url: pathname + (location ? location.search : ''),
    getSp
  }
}
