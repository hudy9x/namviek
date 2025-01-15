import { useSearchParams } from 'next/navigation'

import { useUser } from '@goalie/nextjs'
import { useDebounce } from '@/hooks/useDebounce'
import useTaskFilterContext from './useTaskFilterContext'

export const useTodoFilter = () => {
  const { setFilter } = useTaskFilterContext()
  const sp = useSearchParams()
  const { user } = useUser()

  const applyFilter = (type: string, uid: string) => {
    if (type === 'todo') {
      setFilter(prev => ({
        ...prev,
        ...{
          date: 'any',
          done: 'no',
          assigneeIds: [uid]
        }
      }))
    }
  }

  useDebounce(() => {
    const badgeFilter = sp.get('badgeFilter') || ''

    if (user && user.id) {
      applyFilter(badgeFilter, user.id)
    }
  }, [sp.get('badgeFilter'), user?.id])
}
