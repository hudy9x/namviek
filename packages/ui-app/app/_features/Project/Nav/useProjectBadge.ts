import { taskGetByCond } from '@/services/task'
import { useProjectStore } from '@/store/project'
import { useUser } from '@goalie/nextjs'
import { TaskPriority } from '@prisma/client'
import { LCK, getLocalCache, setLocalCache } from '@shared/libs'
import { useEffect, useRef, useState } from 'react'

interface IBadgeProp {
  total: number
  pid: string
  type: string
}

interface IBadgeData {

  [key: string]: {
    overdue: number
    urgent: number
    upcoming: number
  }
}

const getCachedBadge = () => {
  const cache = getLocalCache(LCK.PROJECT_BADGE)
  if (!cache) return {}
  return JSON.parse(cache)
}

const setCachedBadge = (badges: IBadgeData) => {
  setLocalCache(LCK.PROJECT_BADGE, JSON.stringify(badges))
}

export const useProjectBadge = () => {
  const { pinnedProjects } = useProjectStore()
  const { user } = useUser()
  const [badge, setBadge] = useState<IBadgeData>({})

  useEffect(() => {
    setBadge(getCachedBadge())
  }, [])

  useEffect(() => {
    if (Object.keys(badge).length) {
      setCachedBadge(badge)
    }
  }, [badge])

  const getBadge = async (
    assigneeId: string,
    projectIds: string[],
    abortControllers: AbortController[]
  ) => {
    const today = new Date()
    const evening = new Date()
    evening.setHours(23)
    evening.setMinutes(59)

    projectIds.map(pid => {
      const projectProcess = []

      const abort1 = new AbortController()
      const abort2 = new AbortController()
      const abort3 = new AbortController()

      abortControllers.push(abort1)
      abortControllers.push(abort2)
      abortControllers.push(abort3)

      // get urgent task by user
      projectProcess.push(
        taskGetByCond(
          {
            projectId: pid,
            priority: TaskPriority.URGENT,
            take: 5,
            assigneeIds: [assigneeId],
            counter: true
          },
          abort1.signal
        ).then(res => {
          const dt = res.data
          return {
            type: 'urgent',
            total: dt.total,
            pid
          }
        })
      )

      // get overdue task by user
      projectProcess.push(
        taskGetByCond(
          {
            projectId: pid,
            dueDate: ['undefined', today],
            assigneeIds: [assigneeId],
            take: 5,
            counter: true
          },
          abort2.signal
        ).then(res => {
          const dt = res.data
          return {
            type: 'overdue',
            total: dt.total,
            pid
          }
        })
      )

      // get upcoming task by user
      projectProcess.push(
        taskGetByCond(
          {
            dueDate: [evening, 'undefined'],
            assigneeIds: [assigneeId],
            take: 5,
            counter: true
          },
          abort3.signal
        ).then(res => {
          const dt = res.data
          return {
            type: 'upcoming',
            total: dt.total,
            pid
          }
        })
      )

      // wait for all request finished
      Promise.allSettled(projectProcess).then(res => {
        const datas = res as { status: string; value: IBadgeProp }[]

        let urgent = 0
        let overdue = 0
        let upcoming = 0

        if (pid === '64b11471b0385cb416cc3839') {
          console.log(datas)
        }

        // fill overdue, upcoming, urgent into project id
        datas.forEach(({ status, value }) => {
          if (status !== 'fulfilled') return
          const { total, type } = value

          switch (type) {
            case 'overdue':
              overdue = total
              break
            case 'upcoming':
              upcoming = total
              break
            case 'urgent':
              urgent = total
              break

            default:
              break
          }
        })

        setBadge(prev => {
          return { ...prev, [pid]: { overdue, upcoming, urgent } }
        })
      })
    })
  }

  // wait for a sec before getting badge
  // in order to reduce requests to server
  const timeout = useRef(0)
  const runGetBadge = (
    uid: string,
    projectIds: string[],
    abortControllers: AbortController[]
  ) => {
    if (timeout.current) {
      clearTimeout(timeout.current)
    }

    timeout.current = setTimeout(() => {
      getBadge(uid, projectIds, abortControllers)
    }, 300) as unknown as number
  }

  useEffect(() => {
    const abortControllers: AbortController[] = []
    if (user && user.id) {
      runGetBadge(
        user.id,
        pinnedProjects.map(p => p.id),
        abortControllers
      )
    }

    return () => {
      abortControllers.map(controller => {
        controller.abort()
      })
    }
  }, [pinnedProjects, user?.id])

  return { badge }
}
