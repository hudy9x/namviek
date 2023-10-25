'use client'

import AbsoluteLoading from '@/components/AbsoluateLoading'
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

  return (
    <div className="w-screen h-screen relative flex items-center justify-center">
      <AbsoluteLoading enabled={isLoading} />
      <div className="text-gray-500 text-center">
        {isTokenValid ? (
          <>
            <p>{resMessage}</p>
            <Link className="text-indigo-500 hover:underline" href={`/sign-in`}>
              Back to Login
            </Link>
          </>
        ) : (
          <>
            <p>Something went wrong, try to verify your email again </p>
            <Link className="text-indigo-500 hover:underline" href={`/sign-in`}>
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
