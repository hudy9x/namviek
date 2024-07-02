import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGetParams } from './useGetParams'

export const useUrl = () => {
  const { orgId } = useGetParams()
  const { projectId } = useParams()
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
    projectId,
    orgID: orgId,
    url: pathname + searchPath,
    getSp
  }
}
