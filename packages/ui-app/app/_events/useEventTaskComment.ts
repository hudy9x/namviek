import { useEffect } from 'react'
import { usePusher } from './usePusher'
import { useSearchParams } from 'next/navigation'
import { Comment } from '@prisma/client'

export const useEventSendTaskComment = (cb: (data: Comment) => void) => {
  const searchParams = useSearchParams()
  const taskId = searchParams.get('taskId')
  const { channelTeamCollab } = usePusher()

  useEffect(() => {
    const eventName = `event-send-task-comment-${taskId}`

    channelTeamCollab &&
      channelTeamCollab.bind(eventName, (data: Comment) => {
        cb && cb(data)
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab, taskId, cb])
}

export const useEventUpdateTaskComment = (cb: (data: Comment) => void) => {
  const searchParams = useSearchParams()
  const taskId = searchParams.get('taskId')
  const { channelTeamCollab } = usePusher()

  useEffect(() => {
    const eventName = `event-update-task-comment-${taskId}`

    channelTeamCollab &&
      channelTeamCollab.bind(eventName, (data: Comment) => {
        cb && cb(data)
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab, taskId, cb])
}

export const useEventDeleteTaskComment = (
  cb: (data: { id: string }) => void
) => {
  const searchParams = useSearchParams()
  const taskId = searchParams.get('taskId')
  const { channelTeamCollab } = usePusher()

  useEffect(() => {
    const eventName = `event-delete-task-comment-${taskId}`

    channelTeamCollab &&
      channelTeamCollab.bind(eventName, (data: { id: string }) => {
        cb && cb(data)
      })

    return () => {
      channelTeamCollab && channelTeamCollab.unbind(eventName)
    }
  }, [channelTeamCollab, taskId, cb])
}
