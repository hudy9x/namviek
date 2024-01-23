import { useUrl } from '@/hooks/useUrl'
import { httpPost } from '@/services/_req'
import { channelTeamCollab } from '@shared/libs'
import { useEffect } from 'react'

export const triggerEventMoveTaskToOtherBoard = (data: {
  sourceColId: string
  sourceIndex: number
  destIndex: number
  destColId: string
  projectId: string
}) => {
  if (!data.projectId) return
  return httpPost('/api/event/task-move-to-other-board', data)
}

export const useEventMoveTaskToOtherBoard = (cb: (data: unknown) => void) => {
  const { projectId } = useUrl()

  useEffect(() => {
    const eventName = `event-move-task-to-other-board-${projectId}`

    channelTeamCollab.bind(eventName, (data: unknown) => {
      cb && cb(data)
    })

    return () => {
      channelTeamCollab.unbind(eventName)
    }
  }, [])
}
