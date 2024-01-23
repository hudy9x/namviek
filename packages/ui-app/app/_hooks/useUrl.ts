import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useUrl = () => {
  const { projectId, orgID } = useParams()
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
    orgID,
    url: pathname + searchPath,
    getSp
  }
}
