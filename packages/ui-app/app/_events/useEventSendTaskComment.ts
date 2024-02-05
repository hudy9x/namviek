import { useUrl } from '@/hooks/useUrl'
import { httpPost } from '@/services/_req'
// import { channelTeamCollab } from '@shared/libs'
import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useSearchParams } from 'next/navigation'

export const triggerEventSendTaskComment = (data: {
  sourceColId: string
  sourceIndex: number
  destIndex: number
  destColId: string
  projectId: string
}) => {
  if (!data.projectId) return
  return httpPost('/api/event/task-move-to-other-board', data)
}

export const useEventSendTaskComment = (cb: (data: unknown) => void) => {
  const searchParams = useSearchParams()
  const taskId = searchParams.get('taskId')
  const { channelTeamCollab } = usePusher()

  // console.log({ useEventSendTaskCommentTaskId: taskId })
  useEffect(() => {
    const eventName = `event-send-task-comment-${taskId}`

    channelTeamCollab &&
      channelTeamCollab.bind(eventName, (data: unknown) => {
        cb && cb(data)
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab, taskId, cb])
}
