import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useOrganizationBySlug } from './useOrganizationBySlug'

export const useUrl = () => {
  const { org } = useOrganizationBySlug()
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
    orgID: org?.id,
    url: pathname + searchPath,
    getSp
  }
}
