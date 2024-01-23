import { useUrl } from '@/hooks/useUrl'
import { httpPost } from '@/services/_req'
// import { channelTeamCollab } from '@shared/libs'
import { useEffect } from 'react'
import { usePusher } from './usePusher'

export const triggerEventTaskReorder = (data: {
  sourceColId: string
  sourceIndex: number
  destIndex: number
  projectId: string
}) => {
  return httpPost('/api/event/task-reorder', data)
}

export const useEventTaskReorder = (cb: (data: unknown) => void) => {
  const { projectId } = useUrl()
  const { channelTeamCollab } = usePusher()

  useEffect(() => {
    const eventName = `event-task-reorder-${projectId}`
    if (channelTeamCollab) {
      console.log('binding pusher event', eventName)
      channelTeamCollab.bind(eventName, (data: unknown) => {
        cb && cb(data)
      })
    }

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab])
}
