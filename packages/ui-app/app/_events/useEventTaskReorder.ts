import { useUrl } from '@/hooks/useUrl'
import { httpPost } from '@/services/_req'
import { channelTeamCollab } from '@shared/libs'
import { useEffect } from 'react'

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

  useEffect(() => {
    const eventName = `event-task-reorder-${projectId}`

    channelTeamCollab.bind(eventName, (data: unknown) => {
      cb && cb(data)
    })

    return () => {
      channelTeamCollab.unbind(eventName)
    }
  }, [])
}
