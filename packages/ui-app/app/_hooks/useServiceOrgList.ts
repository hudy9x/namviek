import { orgGet } from '@/services/organization'
import { Organization } from '@prisma/client'
import { ListItemValue } from '@shared/ui'
import { useEffect, useState } from 'react'

export function useServiceOrgList() {
  const [orgs, setOrgs] = useState<ListItemValue[]>([])

  useEffect(() => {
    orgGet().then(res => {
      const { data, status } = res.data
      if (status !== 200) {
        return
      }

      if (data.length) {
        setOrgs(data.map(p => ({ id: p.id + '', tittle: p.name + '' })))
      }
      console.log(data)
    })
  }, [])

  return orgs
}
