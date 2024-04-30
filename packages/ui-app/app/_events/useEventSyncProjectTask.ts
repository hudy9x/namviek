import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useUser } from '@goalie/nextjs'

import { useGetTaskHandler } from '@/features/ProjectContainer/useGetTask'

// @description
// it will be ran as an user create / delete / update a view
export const useEventSyncProjectTask = (projectId: string) => {
  const { user } = useUser()
  const { channelTeamCollab } = usePusher()
  const { fetchNCache } = useGetTaskHandler()

  useEffect(() => {
    if (!user || !user.id) return

    const eventUpdateName = `projectTask:update-${projectId}`

    console.log('bind event:', eventUpdateName)
    channelTeamCollab &&
      channelTeamCollab.bind(eventUpdateName, (data: { triggerBy: string }) => {
        if (data.triggerBy === user.id) return

        fetchNCache()
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventUpdateName)
    }
  }, [channelTeamCollab, user])
}
