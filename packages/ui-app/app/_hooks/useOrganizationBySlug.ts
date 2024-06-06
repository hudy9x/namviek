import { orgGetBySlug } from '@/services/organization'
import { Organization } from '@prisma/client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export const useOrganizationBySlug = () => {
  const [org, setOrg] = useState<Organization | null>(null)
  const { slug } = useParams()

  useEffect(() => {
    orgGetBySlug(slug).then(res => {
      const { data } = res.data
      setOrg(data)
    }).catch(err => {
      console.log(err)
    })
  }, [slug])

  return { org, slug }
}
