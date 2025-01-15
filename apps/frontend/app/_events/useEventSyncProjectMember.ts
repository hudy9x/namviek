import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useUser } from '@goalie/nextjs'

import { useGetMembersHandler } from '@/features/ProjectContainer/useGetMembers'

// @description
// When a new user is added to project
// it will auto re-fetch users and update to user store
export const useEventSyncProjectMember = (projectId: string) => {
  const { user } = useUser()
  const { channelTeamCollab } = usePusher()

  const { fetch } = useGetMembersHandler(projectId)

  useEffect(() => {
    if (!user || !user.id) return

    const eventName = `userProject.sync-to-project-${projectId}`

    console.log('bind event:', eventName)
    channelTeamCollab &&
      channelTeamCollab.bind(eventName, (data: { triggerBy: string }) => {
        if (data.triggerBy === user.id) return
        console.log('called', eventName)
        fetch()
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab, user])
}
