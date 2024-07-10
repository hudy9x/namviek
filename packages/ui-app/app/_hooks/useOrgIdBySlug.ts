import { orgGetBySlug } from '@/services/organization'
import { getLocalCache, setLocalCache } from '@shared/libs'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useOrgIdBySlug = () => {
  const [orgId, setOrgId] = useState<string>()
  const { orgName } = useParams()

  const fetchOrg = () => {
    orgGetBySlug(orgName).then(res => {
      const { data } = res.data
      setLocalCache('ORG_ID', data.id)
      setLocalCache('ORG_SLUG', data.slug)

      setOrgId(data.id)
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    const orgIdCache = getLocalCache('ORG_ID')
    const orgSlugCache = getLocalCache('ORG_SLUG')

    if (orgSlugCache === orgName && orgIdCache) {
      if (orgIdCache !== orgId) {

        setOrgId(orgIdCache)
        return
      }
    }

    // if (!orgIdCache || !orgSlugCache) {
    fetchOrg()
    // }
    //
    // if (orgName !== orgSlugCache) {
    //   fetchOrg()
    // }
    //
    // orgIdCache && setOrgId(orgIdCache)
  }, [orgName, orgId])

  return { orgId }
}
