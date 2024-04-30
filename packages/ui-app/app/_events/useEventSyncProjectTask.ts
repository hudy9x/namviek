import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useUser } from '@goalie/nextjs'

import useGetTask from '@/features/ProjectContainer/useGetTask'
import { messageSuccess } from '@shared/ui'
import { useMemberStore } from '@/store/member'

// @description
// it will be ran as an user create / delete / update a view
export const useEventSyncProjectTask = (projectId: string) => {
  const { user } = useUser()
  const { members } = useMemberStore()
  const { channelTeamCollab } = usePusher()
  const { fetchAllTask } = useGetTask()

  useEffect(() => {
    if (!user || !user.id) return

    const eventUpdateName = `projectTask:update-${projectId}`

    console.log('bind event:', eventUpdateName)
    channelTeamCollab &&
      channelTeamCollab.bind(eventUpdateName, (data: { triggerBy: string }) => {
        if (data.triggerBy === user.id) return
        console.log('called', eventUpdateName)
        const srcUser =
          members.find(({ id }) => id === data.triggerBy)?.name || 'Someone'
        srcUser && messageSuccess(`Tasks are changed by ${srcUser}`)
        // fetch()
        fetchAllTask()
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventUpdateName)
    }
  }, [channelTeamCollab, user])
}
