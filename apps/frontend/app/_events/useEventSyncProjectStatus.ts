import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useUser } from '@auth-client'

import { useGetStatusHandler } from '@/features/ProjectContainer/useGetProjectStatus'

// @description
// it will be ran as an user create / delete / update a view
export const useEventSyncProjectStatus = (projectId: string) => {
  const { user } = useUser()
  const { channelTeamCollab } = usePusher()
  const { fetchNCache } = useGetStatusHandler(projectId)

  useEffect(() => {
    if (!user || !user.id) return

    const eventName = `projectStatus:update-${projectId}`

    console.log('bind event:', eventName)
    channelTeamCollab &&
      channelTeamCollab.bind(eventName, (data: { triggerBy: string }) => {
        if (data.triggerBy === user.id) return
        console.log('called', eventName)
        // fetch()
        fetchNCache()
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab, user])
}
