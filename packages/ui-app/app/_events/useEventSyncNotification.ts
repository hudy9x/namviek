import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useUser } from '@goalie/nextjs'
import { useGetNotificationHandler } from '@/features/Notification/useGetNotification'

// @description
// it will be ran as an user create / delete / update a view
export const useEventSyncNotification = () => {
  const { user } = useUser()
  const { channelTeamCollab } = usePusher()
  const { fetchNCache } = useGetNotificationHandler()

  useEffect(() => {
    if (!user || !user.id) return

    const eventUpdateName = 'notification:update'

    console.log('bind event:', eventUpdateName)
    channelTeamCollab &&
      channelTeamCollab.bind(
        eventUpdateName,
        (data: { triggerBy: string; targets: string[] }) => {
          console.log('event sync notification')
          if (data.triggerBy === user.id) return

          if (!data.targets.includes(user.id)) {
            return
          }

          fetchNCache()
        }
      )

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventUpdateName)
    }
  }, [channelTeamCollab, user])
}
