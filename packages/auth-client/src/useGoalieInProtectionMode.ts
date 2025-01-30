import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { GoalieUser } from './types'
import {
  clearGoalieUser,
  isSessionExpired,
  isSessionStillAlive
} from './lib/util'

export default function useGoalieInProtectionMode({
  user
}: {
  user: GoalieUser | null
}) {
  const publicPages = [
    '/sign-in',
    '/sign-up',
    '/forgot-password',
    '/reset-password'
  ]

  const pathname = usePathname()
  const { push } = useRouter()

  const onAuth = (pathname: string) => {
    // For reset-password with token, we need to check the base path
    const currentPath = pathname.startsWith('/reset-password/') 
      ? '/reset-password'
      : pathname

    const isInsidePublicPages = publicPages.some(p => p === currentPath)

    console.log('isInsidePublicPages', isInsidePublicPages)
    if (isSessionExpired() && !isInsidePublicPages) {
      clearGoalieUser()
      return push('/sign-in')
    }

    if (isSessionStillAlive() && isInsidePublicPages) {
      return push('/organization')
    }
  }

  useEffect(() => {
    user && onAuth(pathname)
  }, [user, pathname])
}
