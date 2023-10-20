'use client'

import { httpGet } from '@/services/_req'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Verification() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const { push } = useRouter()

  const [isLoading, setIsLoading] = useState(true)
  const [isTokenValid, setIsTokenValid] = useState(false)

  useEffect(() => {
    httpGet(`/api/auth/verify?token=${token}`)
      .then(() => {
        setIsTokenValid(true)
        setIsLoading(false)
      })
      .catch(error => setIsLoading(false))
  }, [token])

  if (isLoading) return <p>loading...</p>

  return isTokenValid ? (
    <div>
      <p>Congratulations! Your Account is Now Active.</p>
      <Link href={`${process.env.FRONTEND_DOMAIN}sign-in`}>Back to Login</Link>
    </div>
  ) : (
    <div>
      <p>There is something wrong. Active fail! </p>
    </div>
  )
}
