import { orgGetBySlug } from '@/services/organization'
import { useGlobalDataStore } from '@/store/global'
import { getLocalCache, setLocalCache } from '@shared/libs'
import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const useOrgIdBySlug = () => {
  const { orgId, setOrgId, setOrgName } = useGlobalDataStore()
  const { orgName } = useParams()
  const { push } = useRouter()

  const fetchOrg = () => {
    orgGetBySlug(orgName).then(res => {
      const { data } = res.data
      console.log('set from fetch data')
      setLocalCache('ORG_ID', data.id)
      setLocalCache('ORG_SLUG', data.slug)

      setOrgId(data.id)
      setOrgName(data.slug)
    }).catch(e => {
      push('/organization')
      console.log('fetching org error', e)
    })
  }

  useEffect(() => {
    if (!orgName) return

    const orgIdCache = getLocalCache('ORG_ID')
    const orgSlugCache = getLocalCache('ORG_SLUG')

    if (orgSlugCache === orgName && orgIdCache) {
      if (orgIdCache !== orgId) {
        console.log('set from cache')
        setOrgId(orgIdCache)
        setOrgName(orgName)
        return
      }
    }

    if (orgSlugCache !== orgName) {
      fetchOrg()
    }

  }, [orgName, orgId])

}

export const useGlobalDataFetch = () => {
  useOrgIdBySlug()
}
