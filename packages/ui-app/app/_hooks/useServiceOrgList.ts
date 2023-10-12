import { orgGet } from '@/services/organization'
import { Organization } from '@prisma/client'
import { useEffect, useState } from 'react'

export function useServiceOrgList() {
  const [orgs, setOrgs] = useState<Organization[]>([])

  useEffect(() => {
    orgGet().then(res => {
      const { data, status } = res.data
      if (status !== 200) {
        return
      }

      if (data.length) {
        setOrgs(data)
      }
    })
  }, [])

  return orgs
}
