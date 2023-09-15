import { usePathname } from 'next/navigation'

export const useUrl = () => {
  const pathname = usePathname()

  return {
    url: pathname + location.search
  }
}
