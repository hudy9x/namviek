'use client'

import { httpGet } from '@/services/_req'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Verification() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [isLoading, setIsLoading] = useState(true)
  const [isTokenValid, setIsTokenValid] = useState(false)
  const [resMessage, setResMessage] = useState('')

  useEffect(() => {
    httpGet(`/api/auth/verify?token=${token}`)
      .then(res => {
        setIsTokenValid(true)
        setResMessage(res.data.message)
        setIsLoading(false)
      })
      .catch(error => setIsLoading(false))
  }, [token])

  if (isLoading) return <p>loading...</p>

  return isTokenValid ? (
    <div>
      <p>{resMessage}</p>
      <Link href={`/sign-in`}>Back to Login</Link>
    </div>
  ) : (
    <div>
      <p>There is something wrong. Active fail! </p>
    </div>
  )
}
