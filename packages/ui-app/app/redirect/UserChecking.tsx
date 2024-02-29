'use client'

import { useUser } from '@goalie/nextjs'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { getRecentVisit } from '@shared/libs'

export default function UserChecking() {
  const { user } = useUser()

  useEffect(() => {
    if (user && user.id) {
      const recentVisit = getRecentVisit(user.id)
      if (recentVisit) {
        const location = window.location
        location.href = `${location.protocol}//${location.host}${recentVisit}`
      }
    }

    // NOTE: if user is invalid or sexsion expired <GoaliarProvider /> do the redirect to /sign-in
    // so, DO NOT add any redirect code to /sign-in HERE
  }, [user])
  return <></>
}
