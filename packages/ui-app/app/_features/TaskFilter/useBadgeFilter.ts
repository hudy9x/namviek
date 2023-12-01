import { useSearchParams } from "next/navigation"
import { useTaskFilter } from "./context"

import { StatusType, TaskPriority } from "@prisma/client"
import { useUser } from "@goalie/nextjs"
import { useDebounce } from "@/hooks/useDebounce"

export const useBadgeFilter = () => {
  const { setFilter } = useTaskFilter()
  const sp = useSearchParams()
  const { user } = useUser()

  const applyFilter = (type: string, uid: string) => {

    const today = new Date()
    const evening = new Date()
    evening.setHours(23)
    evening.setMinutes(59)

    switch (type) {
      case 'urgent':
        setFilter(prev => ({
          ...prev, ...{
            date: 'any',
            priority: TaskPriority.URGENT,
            // isDone: 'no',
            assigneeIds: [uid]
          }
        }))
        break;

      case 'overdue':
        setFilter(prev => ({
          ...prev, ...{
            date: 'date-range',
            startDate: undefined,
            endDate: today,
            assigneeIds: [uid]
          }
        }))

        break;

      case 'upcoming':
        console.log('upcoming set')
        setFilter(prev => ({
          ...prev, ...{
            date: 'date-range',
            startDate: evening,
            endDate: undefined,
            assigneeIds: [uid]
          }
        }))

        break;

      default:
        break;
    }
  }

  useDebounce(() => {
    const badgeFilter = sp.get('badgeFilter') || ''

    console.log(badgeFilter)



    if (user && user.id) {
      console.log('run badge', badgeFilter || 'EMPTY')
      applyFilter(badgeFilter, user.id)
    }

  }, [sp.get('badgeFilter'), user?.id])
}
