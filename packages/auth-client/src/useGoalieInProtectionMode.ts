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
  const publicPages = ['/sign-in', '/sign-up']

  const pathname = usePathname()
  const { push } = useRouter()

  const onAuth = (pathname: string) => {
    const isInsidePublicPages = publicPages.some(p => p === pathname)

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
